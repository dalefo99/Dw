using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Razor.Runtime.TagHelpers;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace Dw
{
    // You may need to install the Microsoft.AspNetCore.Razor.Runtime package into your project
    [HtmlTargetElement("google-analytics")]
    public class GoogleAnalyticsTagHelper : TagHelper
    {
        public string TrackingId { get; set; }

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            output.SuppressOutput();

            if (!String.IsNullOrEmpty(TrackingId))
            {
                var sb = new StringBuilder();
                sb.AppendLine($"<script async src=\"https://www.googletagmanager.com/gtag/js?id={TrackingId}\"></script>");
                sb.AppendLine("<script>");
                sb.AppendLine("  window.dataLayer = window.dataLayer || [];");
                sb.AppendLine("  function gtag(){dataLayer.push(arguments);}");
                sb.AppendLine("  gtag('js', new Date());");
                sb.AppendLine($"  gtag('config', '{TrackingId}');");
                sb.AppendLine("</script>");

                output.Content.SetHtmlContent(sb.ToString());
            }
        }
    }
}
