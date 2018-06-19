using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

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
                return Page();
            }

            var mailbody = $@"Hallo website owner,

            This is a new contact request from your website:

            Name: {Contact.Name}
            Email: {Contact.Email}
            Message: {Contact.Message}";

            ViewData["Test"] = mailbody;

            return RedirectToPage("Contact");
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
