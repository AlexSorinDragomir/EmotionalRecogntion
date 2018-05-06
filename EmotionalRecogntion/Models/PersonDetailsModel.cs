using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EmotionalRecogntion.Models
{
    public class PersonDetailsModel
    {
        public string Smile { get; set; }
        public string Gender { get; set; }
        public string Age { get; set; }
        public string Moustache { get; set; }
        public string Beard { get; set; }
        public string Sideburns { get; set; }
        public string Glasses { get; set; }
        public string EyeMakeup { get; set; }
        public string LipMakeup { get; set; }
        public List<AccessoriesModel> Accessories { get; set; }
        public string Bald { get; set; }
        public List<HairColorModel> HairColor { get; set; }
        public string Error { get; set; }
    }
}