using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Dogwood.Pages
{
    public class PortpagesModel : PageModel
    {
        public int Id { get; set; }
        public List<string> imageLinks = new List<string>();


        public void OnGet(int id)
        {

            int start = 11;
            int end = 40;
            

            //start = (25 * id) + 1;
            //end = start + 24;

            for (int i = start; i <= end; i++)
            {
                string imageLink = string.Format("<img class='modalClick' src = '../images/portfolio/mansfield-{0}.jpg' alt = 'Durham Wedding Photography " + i.ToString() + "' />", i);
                imageLinks.Add(imageLink);
            }

        }
    }
}