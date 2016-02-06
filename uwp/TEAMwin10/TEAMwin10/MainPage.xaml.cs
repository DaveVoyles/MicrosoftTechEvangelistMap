using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Threading.Tasks;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.Storage;
using Windows.UI.Core;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;

// The Blank Page item template is documented at http://go.microsoft.com/fwlink/?LinkId=402352&clcid=0x409

namespace TEAMwin10
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class MainPage : Page
    {
        private OfficeGraphData PeopleData;

        public MainPage()
        {
            try
            {
                this.InitializeComponent();

                Task.Run(() => this.LoadData()).Wait();

                ListPeople.ItemsSource = PeopleData.value;
            }
            catch (Exception ex)
            {
                var dlg = new Windows.UI.Popups.MessageDialog("Oops! Something went wrong: " + Environment.NewLine + Environment.NewLine 
                                                                + ex.Message + Environment.NewLine
                                                                + ex.InnerException.Message);
            }
        }

        private void SplitViewButton_Click(object sender, RoutedEventArgs e)
        {
            MySplitView.IsPaneOpen = !MySplitView.IsPaneOpen;
        }

        private async Task LoadData()
        {
            try
            {
                StorageFolder folder = Windows.ApplicationModel.Package.Current.InstalledLocation;
                StorageFile dataFile =
                    await folder.GetFileAsync(@"SampleData\joedirects.json");
                string json = await FileIO.ReadTextAsync(dataFile);
                PeopleData = JsonConvert.DeserializeObject<OfficeGraphData>(json);
            }
            catch (Exception ex)
            {
                // Do something with the exception here
                throw;
            }
        }

        private void phoneLink_Click(object sender, RoutedEventArgs e)
        {
            HyperlinkButton phonelink = (HyperlinkButton)sender;
            string phonenumber = phonelink.Content.ToString();
            if (phonenumber != "N/A")
            {
                if (Windows.Foundation.Metadata.ApiInformation.IsTypePresent("Windows.ApplicationModel.Calls.PhoneCallManager"))
                {
                    CallwithPhoneDialer(phonenumber);
                }
                else
                {
                    CallwithSkype(phonenumber);
                }
            }
        }

        private async void CallwithSkype(string contactnumber)
        {
            var uriSkype = new Uri(@"Skype:(" + contactnumber  + ")? call");

            // Set the option to show a warning
            var promptOptions = new Windows.System.LauncherOptions();
            promptOptions.TreatAsUntrusted = true;

            // Launch the URI
            var success = await Windows.System.Launcher.LaunchUriAsync(uriSkype, promptOptions);

            if (success)
            {
                // URI launched
            }
            else
            {
                // URI launch failed
            }
        }

        private async void CallwithPhoneDialer(string contactnumber)
        {
            Windows.ApplicationModel.Calls.PhoneCallManager.ShowPhoneCallUI(contactnumber, "Colleague");
        }
    }
}
