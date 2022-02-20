using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Serialization;
using HomeSite.Data.Model;

namespace HomeSite.Config
{
    public class ConfigWorker
    {
        string configPath = @$"{AppDomain.CurrentDomain.BaseDirectory}config.xml";
        ConfigData defaultConfig = new ConfigData
        {
            DBConnectionString = "SomeConnectionString",
        };
        public ConfigData GetConfig()
        {
            if (File.Exists(configPath))
            {
                try
                {
                    TextReader tr = new StreamReader(configPath);
                    return Read(tr);
                }
                catch
                {
                    Debug.WriteLine($"Homesite: cofig.xml reading failed! {DateTime.UtcNow.ToString("G")}");
                    return defaultConfig;
                }
            }
            else
            {
                Debug.WriteLine($"Homesite: cofig.xml not exist, creating... {DateTime.UtcNow.ToString("G")}");
                try
                {
                    TextWriter tw = new StreamWriter(configPath);
                    Write(tw, defaultConfig);
                    tw.Close();
                    Debug.WriteLine($"Homesite: Please configure config.xml {DateTime.UtcNow.ToString("G")}");
                    return defaultConfig;
                }
                catch
                {
                    Debug.WriteLine($"Homesite: cofig.xml creating failed! {DateTime.UtcNow.ToString("G")}");
                    return defaultConfig;
                }
            }
        }
        void Write(TextWriter writer, ConfigData config)
        {
            XmlSerializer x = new XmlSerializer(typeof(ConfigData));
            x.Serialize(writer, config);
        }
        ConfigData Read(TextReader reader)
        {
            XmlSerializer x = new XmlSerializer(typeof(ConfigData));
            return (ConfigData)x.Deserialize(reader);
        }
    }
}
