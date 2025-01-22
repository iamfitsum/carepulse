import RegisterForm from "@/components/forms/RegisterForm";
import { getPatient, getUser } from '@/lib/actions/patient.actions';
import appConfig from "@/lib/appConfig";
import Image from "next/image";
import { redirect } from 'next/navigation';
import React from "react";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  const patient = await getPatient(userId);

  if (patient) redirect(`/patients/${userId}/new-appointment`);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src={appConfig.logo.full}
            height={1000}
            width={1000}
            alt="logo"
            className="mb-12 h-10 w-fit"
          />

          <RegisterForm user={user} />

          <p className="copyright py-12">{appConfig.copyright()}</p>
        </div>
      </section>

      <Image
        src={appConfig.images.register}
        height={1000}
        width={1000}
        alt="register image"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
