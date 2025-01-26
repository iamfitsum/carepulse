import appConfig from "@/lib/appConfig";
import Image from "next/image";
import Link from "next/link";

import { StatCard } from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { doctorColumns } from "@/components/table/doctor-columns";
import { getDoctors } from "@/lib/actions/doctor.actions";
import { DoctorModal } from "@/components/DoctorModal";

const AdminPage = async () => {
  const [appointments, doctors] = await Promise.all([
    getRecentAppointmentList(),
    getDoctors(),
  ]);

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src={appConfig.logo.full}
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>

        <p className="text-16-semibold">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">
            Start the day with managing new appointments
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Scheduled appointments"
            icon={appConfig.images.appointments}
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Pending appointments"
            icon={appConfig.images.pending}
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="Cancelled appointments"
            icon={appConfig.images.cancelled}
          />
        </section>

        <DataTable columns={columns} data={appointments.documents} />

        <section className="space-y-4 w-full">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-xl font-semibold">Manage Doctors</h2>
            <DoctorModal />
          </div>
          <DataTable columns={doctorColumns} data={doctors} />
        </section>
      </main>
    </div>
  );
};

export default AdminPage;
