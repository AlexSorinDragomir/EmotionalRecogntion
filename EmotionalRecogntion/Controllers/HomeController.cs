using EmotionalRecogntion.Utils;
using System.Web.Mvc;

namespace EmotionalRecogntion.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            SetBootstrapCss(ViewBag);

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Emotion Recognition in Images";
            SetBootstrapCss(ViewBag);

            return View();
        }

        private void SetBootstrapCss(dynamic viewBag)
        {
            string value = Constants.DefaultTheme;
            if (Request.Cookies[Constants.BootstrapCss] != null)
            {
                value = Request.Cookies[Constants.BootstrapCss].Value;
            }

            viewBag.BootstrapCss = value;
        }

    }
}