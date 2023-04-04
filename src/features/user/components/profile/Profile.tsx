import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserWithCompanyById } from "../../api";
import { FaGraduationCap, FaBriefcase, FaShare, FaPhone } from "react-icons/fa";
import { BsCalendarDateFill } from "react-icons/bs";
import { MdLocationPin, MdMail } from "react-icons/md";

const Profile = () => {
  const { userId } = useParams();
  const [profileData, setProfileData] = useState<Profile | null>(null);

  useEffect(() => {
    const fetch = async () => {
      if (!userId) return;
      const fetchedUser = await getUserWithCompanyById(userId);
      setProfileData(fetchedUser);
    };
    fetch();
  }, [userId]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 rounded-xl bg-primary p-3">
        <div className="flex items-center gap-3">
          <img
            src={profileData?.user.photo as string}
            className="h-16 w-16 rounded-full"
          />
          <div className="flex flex-col gap-0.5 text-primary">
            <div className="text-2xl text-primary">
              {profileData?.user.username}
            </div>
            {profileData?.user.type === "student" ? (
              <>
                <div className="flex items-center gap-3">
                  <FaBriefcase />
                  {profileData?.user.title}
                </div>
                <div className="flex items-center gap-3">
                  <FaGraduationCap />
                  {profileData?.user.education}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3 text-sm text-primary">
                <FaBriefcase />
                Recruiter
              </div>
            )}
          </div>
        </div>
        <button className="flex w-full items-center justify-center gap-3 rounded-xl bg-secondary py-2">
          <FaShare />
          Share profile
        </button>
      </div>
      <div className="flex flex-col gap-1 rounded-xl bg-primary p-3">
        <div className="font-semibold">About me</div>
        <div className="text-sm text-primary">
          {profileData?.user.introduction}
        </div>
      </div>
      {profileData?.user.type === "student" && (
        <div className="flex flex-col gap-3 rounded-xl bg-primary p-3">
          <div className="font-semibold text-primary">LIA Periods</div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 rounded-xl bg-secondary py-2 px-3">
              <BsCalendarDateFill />
              {profileData?.user.start_date?.toString()}
            </div>
            to
            <div className="flex items-center gap-3 rounded-xl bg-secondary py-2 px-3">
              <BsCalendarDateFill />
              {profileData?.user.end_date?.toString()}
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-1 rounded-xl bg-primary p-3">
        <div className="font-semibold">Contact</div>
        <div className="flex items-center gap-3 text-sm text-primary">
          <FaPhone />
          {profileData?.user.phone}
        </div>
        {profileData?.user.type === "student" && (
          <div className="flex items-center gap-3 text-sm">
            <MdLocationPin />
            {profileData?.user.location}
          </div>
        )}
        <div className="flex items-center gap-3 text-sm">
          <MdMail />
          {profileData?.user.email}
        </div>
      </div>
      {profileData?.user.type === "student" && (
        <div className="flex flex-col gap-3 rounded-xl bg-primary p-3">
          <div className="font-semibold text-primary">Skills</div>
          <div className="flex flex-wrap gap-3">
            {profileData?.user.skills?.map((skill) => (
              <div className="rounded-xl bg-secondary py-1.5 px-3 text-sm text-primary">
                {skill}
              </div>
            ))}
          </div>
        </div>
      )}
      {profileData?.user.type === "company" && (
        <div className="flex flex-col gap-1 rounded-xl bg-primary p-3">
          <div className="font-semibold text-primary">Company</div>
          <div className="flex items-center gap-3">
            <img
              src={profileData.company.logo as string}
              className="h-10 w-10"
            />
            <div>
              <div className="text-primary">{profileData.company.name}</div>
              <div className="text-sm text-primary">
                {profileData.company.url}
              </div>
            </div>
          </div>
          <div className="text-sm text-primary">
            {profileData.company.description}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
