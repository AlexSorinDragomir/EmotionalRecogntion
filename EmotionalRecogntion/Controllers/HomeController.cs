using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;

namespace EmotionalRecogntion.Controllers
{
    public class HomeController : Controller
    {
        private readonly string bootstrapCss = "bootstrapCss";
        private readonly string defaultTheme = "bootstrap-minty";
        public ActionResult Index()
        {
            SetBootstrapCss(ViewBag);

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";
            SetBootstrapCss(ViewBag);

            return View();
        }

        private void SetBootstrapCss(dynamic viewBag)
        {
            string value = defaultTheme;
            if (Request.Cookies[bootstrapCss] != null)
            {
                value = Request.Cookies[bootstrapCss].Value;
            }

            viewBag.BootstrapCss = value;
        }

        public ActionResult AnalyzeImage(string path)
        {
            string processName = @"C:\Users\Alex\source\repos\Emotional Recognition\EmotionalRecogntion\EmotionalRecognitionConsoleApp\EmotionalRecognitionConsoleApp\bin\Debug\EmotionalRecognitionConsoleApp.exe";

            System.Diagnostics.Process.Start(processName, path);

            return null;
        }

    }
}