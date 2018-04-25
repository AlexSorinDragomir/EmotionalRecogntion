﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EmotionalRecogntion.Utils
{
    public static class Constants
    {
        // Replace or verify the region.
        //
        // You must use the same region in your REST API call as you used to obtain your subscription keys.
        // For example, if you obtained your subscription keys from the westus region, replace 
        // "westcentralus" in the URI below with "westus".
        //
        // NOTE: Free trial subscription keys are generated in the westcentralus region, so if you are using
        // a free trial subscription key, you should not need to change this region.
        public const string UriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";
        public const string FaceAttributes = "faceAttributes";
        public const string Emotion = "emotion";
        public const string Anger = "anger";
        public const string Contempt = "contempt";
        public const string Disgust = "disgust";
        public const string Fear = "fear";
        public const string Happiness = "happiness";
        public const string Neutral = "neutral";
        public const string Sadness = "sadness";
        public const string Surprise = "surprise";
        public const string BootstrapCss = "bootstrapCss";
        public const string DefaultTheme = "bootstrap-minty";
        public const string SubscriptionKey = "7c0790e2df3d43239dc027790a6700f9";
    }
}