using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EmotionalRecogntion.Models
{
    public class EmotionSectionModel
    {
        public EmotionSectionModel(string mainEmotion, string anger, string contempt, string disgust, 
            string fear, string happiness, string neutral, string sadness, string surprise)
        {
            MainEmotion = mainEmotion;
            Anger = anger;
            Contempt = contempt;
            Disgust = disgust;
            Fear = fear;
            Happiness = happiness;
            Neutral = neutral;
            Sadness = sadness;
            Surprise = surprise;
        }

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