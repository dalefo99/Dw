using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.ViewFeatures;

namespace Dogwood.Pages
{
    public class ContactModel : PageModel
    {
        [BindProperty]
        public ContactFormModel Contact { get; set; }


        public void OnGet()
        {

        }



        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                ViewData["Test"] = "test";
                return Page();
            }
            

            var mailbody = $@"Hallo website owner,
            
            This is a new contact request from your website:
            
            Name: {Contact.Name}
            Email: {Contact.Email}
            Message: {Contact.Message}";

            var smtpClient = new SmtpClient
            {
                Host = "smtp.gmail.com", // set your SMTP server name here
                Port = 587, // Port 
                EnableSsl = true,
                Credentials = new NetworkCredential("dale@foshe.org", "spuDC@mera99")
            };



            using (var message = new MailMessage(Contact.Email, "dale@foshe.org"))
            {
                message.To.Add(new MailAddress("dale@foshe.org"));
                message.From = new MailAddress(Contact.Email);
                message.Subject = "New E-Mail from my website";
                message.Body = mailbody;

                await smtpClient.SendMailAsync(message);
            }


            //return RedirectToPage("Contact");
            ViewData["Sent"] = "Message Successfully Sent!";
            return Page();
        }
    }



    public class ContactFormModel
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Message { get; set; }
    }
}
