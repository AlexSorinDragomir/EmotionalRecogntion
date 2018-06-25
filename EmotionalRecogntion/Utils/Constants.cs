using System;
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

        // emotions
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

        // other person details
        public const string FaceRectangle = "faceRectangle";
        public const string Top = "top";
        public const string Left = "left";
        public const string Width = "width";
        public const string Height = "height";
        public const string Smile = "smile";
        public const string Gender = "gender";
        public const string Age = "age";
        public const string Moustache = "moustache";
        public const string Beard = "beard";
        public const string Sideburns = "sideburns";
        public const string Glasses = "glasses";
        public const string EyeMakeup = "eyeMakeup";
        public const string LipMakeup = "lipMakeup";
        public const string Accessories = "accessories";
        public const string Hair = "hair";
        public const string Bald = "bald";
        public const string HairColor = "hairColor";
        public const string FacialHair = "facialHair";
        public const string Makeup = "makeup";
        public const string Confidence = "confidence";
        public const string Type = "type";
        public const string Color = "color";

        // bootstrap themes
        public const string BootstrapCss = "bootstrapCss";
        public const string DefaultTheme = "bootstrap-minty";

        // subscriptionKey
        //public const string SubscriptionKey = "7c0790e2df3d43239dc027790a6700f9";
        //public const string SubscriptionKey = "feec5f5a37204b6d8bfe73e488c18afe";
        public const string SubscriptionKey = "08ea7161220c44f5b6c6b0bd9dc37425";
    }
}