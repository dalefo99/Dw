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



            var studioLocation = new List<string> { "Durham", "Raleigh", "Raleigh-Durham", "Durham, NC", "Raleigh, NC", "Raleigh-Durham, NC" };
            var studioType = new List<string> { "Wedding Photography", "Wedding Photographer", "Wedding Photos" };

            //int start = 1;
            //int end = 40;

            int locCounter = 0;
            int typeCounter = 0;


            int start = (12 * id)  + 1;
            int end = start + 11;


            //int start = (25 * id); // + 1;
            //int end = start + 24;

            for (int i = start; i <= end; i++)
            {
                string imageLink = string.Format("<img class='modalClick' src = '../images/portfolio/raleigh-durham-wedding-photography-{0}.jpg' alt = '{1} {2}' />", i, studioLocation[locCounter], studioType[typeCounter]);
                imageLinks.Add(imageLink);


                locCounter = (locCounter >= studioLocation.Count - 1) ? 0 : ++locCounter;
                typeCounter = (typeCounter >= studioType.Count - 1) ? 0 : ++typeCounter;



            }

        }
    }
}