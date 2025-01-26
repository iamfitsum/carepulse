import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";
import appConfig from "@/lib/appConfig";
import { getDoctors } from "@/lib/actions/doctor.actions";
import { Doctor } from "@/types/appwrite.types";

const RequestSuccess = async ({
  searchParams,
  params: { userId },
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const [appointment, doctors] = await Promise.all([
    getAppointment(appointmentId),
    getDoctors(),
  ]);

  const doctor = doctors.find(
    (doctor: Doctor) => doctor.name === appointment.primaryPhysician,
  );

  return (
    <div className=" flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src={appConfig.logo.full}
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src={appConfig.gifs.success}
            height={300}
            width={280}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>We&apos;ll be in touch shortly to confirm.</p>
        </section>

        <section className="request-details">
          <p>Requested appointment details: </p>
          <div className="flex items-center gap-3">
            <div className="relative size-6">
              <Image
                src={doctor?.imageUrl || "/assets/images/default-doctor.png"}
                alt="doctor"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex items-center gap-2">
              <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
              <span className="bg-green-100 text-green-800 text-12-semibold px-2 py-0.5 rounded-full">
                {doctor.specialization || "General Practice"}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Image
              src={appConfig.images.calendar}
              height={24}
              width={24}
              alt="calendar"
            />
            <p> {formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>

        <p className="copyright py-12">{appConfig.copyright()}</p>
      </div>
    </div>
  );
};

export default RequestSuccess;
