using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading;
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
            

            var mailbody = $@"         
            New contact request from your website:
            
            Name: {Contact.Name}
            Email: {Contact.Email}
            URL: {Contact.url}
            Message: {Contact.Message}";


            if (Contact.url != null)
            {
                //Only a spammer fills out the URL, fake it.

                //Thread.Sleep(1000);
                //ViewData["Sent"] = "  Thanks for contacting us!";
                //return Page();

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
                    message.Subject = "Website: Dumb spammer filled out URL";
                    message.Body =  mailbody;

                    await smtpClient.SendMailAsync(message);
                }


                //return RedirectToPage("Contact");
                ViewData["Sent"] = "  Thanks for contacting us!";
                return Page();


            }
            else
            {
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
                ViewData["Sent"] = "  Thanks for contacting us!";
                return Page();

            }
            



        }
    }



    public class ContactFormModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public string url { get; set; }

        [Required]
        public string Message { get; set; }
    }
}
