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
            setBootstrapCss(ViewBag);

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";
            setBootstrapCss(ViewBag);

            return View();
        }

        private void setBootstrapCss(dynamic viewBag)
        {
            string value = defaultTheme;
            if (Request.Cookies[bootstrapCss] != null)
            {
                value = Request.Cookies[bootstrapCss].Value;
            }

            viewBag.BootstrapCss = value;
        }

    }
}