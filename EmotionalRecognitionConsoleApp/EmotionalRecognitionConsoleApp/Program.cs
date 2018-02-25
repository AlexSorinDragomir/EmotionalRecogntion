using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Emgu;
using Emgu.CV;
using Emgu.CV.Structure;

namespace EmotionalRecognitionConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            if (args.Length == 0)
            {
                System.Console.WriteLine("Please enter a valid image path parameter.");
                return;
            }

            string fileName = args[0];
            Image<Bgr, byte> imf = new Image<Bgr, byte>(fileName);
            CvInvoke.Imshow("Image", imf);

            CvInvoke.WaitKey(0);
        }
    }
}
