import { mail_black, telephone_black } from "@/app/assets/svg";
import React from "react";

const ContactUs = () => {
  return (
    <section className="flex items-center justify-center py-15 px-10 mobile:p-0 ">
      <div className="flex flex-col gap-4 max-w-[1280px] w-full bg-[#212121] shadow-2xl rounded-2xl p-10 mobile:rounded-tl-none mobile:rounded-tr-none mobile:p-6">
        <h3 className="font-bold text-3xl  text-muted-light mobile:text-xl">
          Կապ
        </h3>
        <div className="flex flex-col gap-2">
          <p>
            Մեր գրասենյակը գտնվում է Երևանի կենտրոնում, Հանրապետության 67
            հասցեում, 3-րդ հարկ, 36 սենյակ
          </p>
          <div className="flex items-center gap-1">
            {React.cloneElement(telephone_black, {
              className: "w-[40px] mobile:w-[24px]",
            })}

            <a
              href="tel:+37494450054"
              className="text-purple-600 hover:underline"
            >
              (+37494) 45-00-54{" "}
            </a>
          </div>
          <div className="flex items-center gap-1">
            {React.cloneElement(telephone_black, {
              className: "w-[40px] mobile:w-[24px]",
            })}
            <div>
              <a
                className="text-purple-600 hover:underline"
                href="tel:+37491006040"
              >
                (+37491) 00-60-40{"  "}
              </a>
              {"  "}
              Արմեն Բաղդասարյան, արտոնագրված փաստաբան, արտոնագիր թիվ 689,
              Արմադել Քոնսալթինգ ընկերության հիմնադիր և գործադիր տնօրեն
            </div>
          </div>
          <div className="flex items-center gap-1">
            {React.cloneElement(mail_black, {
              className: "w-[40px] mobile:w-[24px]",
            })}

            <a
              className="text-purple-600 hover:underline"
              href="mailto:tatoyan.partners@gmail.com"
            >
              tatoyan.partners@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
