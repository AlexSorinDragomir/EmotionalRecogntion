using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EmotionalRecogntion.Models
{
    public class PersonDetailsModel
    {
        private string Smile { get; set; }
        private string Gender { get; set; }
        private string Age { get; set; }
        private string Moustache { get; set; }
        private string Beard { get; set; }
        private string Sideburns { get; set; }
        private string glasses { get; set; }
        private string EyeMakeup { get; set; }
        private string LipMakeup { get; set; }
        private List<string> Accessories { get; set; }
        private List<string> Hair { get; set; }
        private List<string> HairColor { get; set; }
        private string Error { get; set; }
    }
}