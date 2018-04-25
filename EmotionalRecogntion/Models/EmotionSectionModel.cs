using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EmotionalRecogntion.Models
{
    public class EmotionSectionModel
    {
        public EmotionSectionModel(string emotions)
        {
            Emotions = emotions;
        }

        public string Emotions { get; set; }
    }
}