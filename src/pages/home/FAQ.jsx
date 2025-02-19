import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How do I start earning on PayPlz?",
    answer:
      "Simply sign up, browse available tasks, complete them, and get paid directly to your account.",
  },
  {
    question: "Is there a minimum withdrawal limit?",
    answer:
      "Yes, the minimum withdrawal limit is $10. You can withdraw your earnings via bank transfer, or other supported methods.",
  },
  {
    question: "Are all tasks verified?",
    answer:
      "Yes, tasks are reviewed before being posted to ensure authenticity and fair compensation.",
  },
  {
    question: "How long does it take to get paid?",
    answer:
      "Payments are usually processed within 24-48 hours after task approval.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mx-4 sm:mx-6 md:mx-12">
      <section className="max-w-4xl mx-auto py-12 px-6 mt-24 border-2 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-500 pb-3">
              <button
                className="w-full flex justify-between items-center py-3 text-left text-lg font-medium text-gray-700 dark:text-gray-100 focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {openIndex === index && (
                <p className="text-gray-500 dark:text-gray-300 mt-2">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FAQ;
