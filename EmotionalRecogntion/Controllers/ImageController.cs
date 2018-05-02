﻿using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json.Linq;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using EmotionalRecogntion.Utils;
using System.Web.UI.WebControls;
using System.Web;
using System.Net;
using EmotionalRecogntion.Models;

namespace EmotionalRecogntion.Controllers
{
    public class ImageController : Controller
    {
        private static JArray JsonApiResponse { get; set; }

        [HttpGet]
        public string GetMoreDetails()
        {
            try
            {
                return "empty";
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }

        [HttpPost]
        public async Task<ActionResult> AnalyzeImage(HttpPostedFileBase uploadedImage)
        {
            try
            {
                byte[] fileData = null;
                using (var binaryReader = new BinaryReader(uploadedImage.InputStream))
                {
                    fileData = binaryReader.ReadBytes(uploadedImage.ContentLength);
                }
                var emotions = await MakeAnalysisRequest(fileData);
                return PartialView("~/Views/Image/_EmotionSection.cshtml", emotions);
            }
            catch (Exception ex)
            {
                var emotionModelList = new List<EmotionSectionModel>();
                emotionModelList.Add(new EmotionSectionModel(ex.ToString()));
                        return PartialView("~/Views/Image/_EmotionSection.cshtml", emotionModelList);
            }
        }

        [HttpPost]
        public async Task<ActionResult> AnalyzeImageFromUrl(string imageUrlAddress)
        {
            try
            {
                byte[] fileData = GetImageAsByteArrayFromUrl(imageUrlAddress);
                var emotions = await MakeAnalysisRequest(fileData);
                return PartialView("~/Views/Image/_EmotionSection.cshtml", emotions);
            }
            catch (Exception ex)
            {
                var emotionModelList = new List<EmotionSectionModel>();
                emotionModelList.Add(new EmotionSectionModel(ex.ToString()));
                return PartialView("~/Views/Image/_EmotionSection.cshtml", emotionModelList);
            }
        }
              
        static byte[] GetImageAsByteArrayFromUrl(string imageFilePath)
        {
            var webClient = new WebClient();
            byte[] imageBytes = webClient.DownloadData(imageFilePath);
            return imageBytes;
        }

        /// <summary>
        /// Gets the analysis of the specified image file by using the Computer Vision REST API.
        /// </summary>
        /// <param name="imageFilePath">The image file.</param>
        static async Task<List<EmotionSectionModel>> MakeAnalysisRequest(byte[] byteData)
        {
            HttpClient client = new HttpClient();

            // Request headers.
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", Constants.SubscriptionKey);

            // Request parameters. A third optional parameter is "details".
            string requestParameters = "returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise";

            // Assemble the URI for the REST API Call.
            string uri = Constants.UriBase + "?" + requestParameters;

            HttpResponseMessage response;

            // Request body. Posts a locally stored JPEG image.
            //byte[] byteData = GetImageAsByteArray(imageFilePath);

            using (ByteArrayContent content = new ByteArrayContent(byteData))
            {
                // This example uses content type "application/octet-stream".
                // The other content types you can use are "application/json" and "multipart/form-data".
                content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");

                // Execute the REST API call.
                response = await client.PostAsync(uri, content);

                // Get the JSON response.
                string contentString = await response.Content.ReadAsStringAsync();

                // JSON response.
                var jsonString = JsonPrettyPrint(contentString);
                JArray jsonArrayObj = JArray.Parse(contentString);
                JsonApiResponse = jsonArrayObj;

                var emotions = GetEmotionsFromJsonArray(jsonArrayObj);
                return emotions;
            }
        }


        /// <summary>
        /// Returns the contents of the specified file as a byte array.
        /// </summary>
        /// <param name="imageFilePath">The image file to read.</param>
        /// <returns>The byte array of the image data.</returns>
        static byte[] GetImageAsByteArray(string imageFilePath)
        {
            FileStream fileStream = new FileStream(imageFilePath, FileMode.Open, FileAccess.Read);
            BinaryReader binaryReader = new BinaryReader(fileStream);
            return binaryReader.ReadBytes((int)fileStream.Length);
        }

        static List<EmotionSectionModel> GetEmotionsFromJsonArray(JArray jsonArray)
        {
            var emotionSectionModelList = new List<EmotionSectionModel>();
            if (jsonArray.Count() == 0)
            {
                var emotionSectionModel = new EmotionSectionModel("No person detected, plese try to use a better image!");
                emotionSectionModelList.Add(emotionSectionModel);
                return emotionSectionModelList;
            }

            if (jsonArray.Count() == 1)
            {
                var emotionSectionModel = GetEmotionsModel(jsonArray.First());
                emotionSectionModel.MainEmotion = "The main emotion seems to be: " + 
                    ComputeMainEmotion(jsonArray.First()[Constants.FaceAttributes][Constants.Emotion]);
                emotionSectionModelList.Add(emotionSectionModel);
                return emotionSectionModelList;
            }

            if (jsonArray.Count() > 1)
            {
                int count = 1;
                foreach (var item in jsonArray.ToList())
                {
                    var emotionSectionModel = GetEmotionsModel(item);
                    var mainEmotion = ComputeMainEmotion(item[Constants.FaceAttributes][Constants.Emotion]);
                    emotionSectionModel.MainEmotion += "Person number " + count++ + " seems to mainly feel " + mainEmotion;
                    emotionSectionModelList.Add(emotionSectionModel);
                }
            }

            return emotionSectionModelList;
        }

        private static EmotionSectionModel GetEmotionsModel(JToken json)
        {
            var emotionSectionModel = new EmotionSectionModel();
            var emotionJson = json[Constants.FaceAttributes][Constants.Emotion];
            emotionSectionModel.Anger = emotionJson[Constants.Anger].ToString();
            emotionSectionModel.Contempt = emotionJson[Constants.Contempt].ToString();
            emotionSectionModel.Disgust = emotionJson[Constants.Disgust].ToString();
            emotionSectionModel.Fear = emotionJson[Constants.Fear].ToString();
            emotionSectionModel.Happiness = emotionJson[Constants.Happiness].ToString();
            emotionSectionModel.Neutral = emotionJson[Constants.Neutral].ToString();
            emotionSectionModel.Sadness = emotionJson[Constants.Sadness].ToString();
            emotionSectionModel.Surprise = emotionJson[Constants.Surprise].ToString();
            return emotionSectionModel;
        }

        private static string ComputeMainEmotion(JToken item)
        {
            Dictionary<string, double> emotionsDictionary = new Dictionary<string, double>
            {
                { Constants.Anger, (double)item[Constants.Anger] },
                { Constants.Contempt , (double)item[Constants.Contempt] },
                { Constants.Disgust , (double)item[Constants.Disgust] },
                { Constants.Fear, (double)item[Constants.Fear] },
                { Constants.Happiness, (double)item[Constants.Happiness] },
                { Constants.Neutral, (double)item[Constants.Neutral] },
                { Constants.Sadness, (double)item[Constants.Sadness] },
                { Constants.Surprise, (double)item[Constants.Surprise] }
            };

            return emotionsDictionary.FirstOrDefault(pair => pair.Value == emotionsDictionary.Values.Max()).Key;
        }

        /// <summary>
        /// Formats the given JSON string by adding line breaks and indents.
        /// </summary>
        /// <param name="json">The raw JSON string to format.</param>
        /// <returns>The formatted JSON string.</returns>
        static string JsonPrettyPrint(string json)
        {
            if (string.IsNullOrEmpty(json))
                return string.Empty;

            json = json.Replace(Environment.NewLine, "").Replace("\t", "");

            StringBuilder sb = new StringBuilder();
            bool quote = false;
            bool ignore = false;
            int offset = 0;
            int indentLength = 3;

            foreach (char ch in json)
            {
                switch (ch)
                {
                    case '"':
                        if (!ignore) quote = !quote;
                        break;
                    case '\'':
                        if (quote) ignore = !ignore;
                        break;
                }

                if (quote)
                    sb.Append(ch);
                else
                {
                    switch (ch)
                    {
                        case '{':
                        case '[':
                            sb.Append(ch);
                            sb.Append(Environment.NewLine);
                            sb.Append(new string(' ', ++offset * indentLength));
                            break;
                        case '}':
                        case ']':
                            sb.Append(Environment.NewLine);
                            sb.Append(new string(' ', --offset * indentLength));
                            sb.Append(ch);
                            break;
                        case ',':
                            sb.Append(ch);
                            sb.Append(Environment.NewLine);
                            sb.Append(new string(' ', offset * indentLength));
                            break;
                        case ':':
                            sb.Append(ch);
                            sb.Append(' ');
                            break;
                        default:
                            if (ch != ' ') sb.Append(ch);
                            break;
                    }
                }
            }

            return sb.ToString().Trim();
        }
    }
}