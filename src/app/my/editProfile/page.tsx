import CompanyList from "@/components/common/CompanyList";
import TopNav from "@/components/common/TopNav";
import EditProfileForm from "@/components/myPage/EditProfilePage/EditProfileForm";
import profileData from "@/mocks/seon/pbProfile.json";
import { companyListData } from "@/mocks/seon/companyList";
function EditProfilePage() {
  const pbProfile = profileData.data;
  return (
    <>
      <TopNav title="프로필 수정" hasBack={true} />
      <div className="mb-8 text-xs">
        <p>*해당 프로필은 리스트 상에 노출되는 정보이오니 신중히 입력해 주세요.</p>
        <p>*일부 정보는 회원가입 시 등록하신 정보가 반영됩니다.</p>
      </div>
      <EditProfileForm existingProfile={pbProfile} />
    </>
  );
}

export default EditProfilePage;
