using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EmotionalRecogntion.Models
{
    public class EmotionSectionModel
    {
        public EmotionSectionModel (string error)
        {
            Error = error;
        }

        public EmotionSectionModel()
        {
        }

        public string MainEmotion { get; set; }
        public string Anger { get; set; }
        public string Contempt  { get; set; }
        public string Disgust { get; set; }
        public string Fear { get; set; }
        public string Happiness { get; set; }
        public string Neutral { get; set; }
        public string Sadness { get; set; }
        public string Surprise { get; set; }
        public string Error { get; set; }
    }
}