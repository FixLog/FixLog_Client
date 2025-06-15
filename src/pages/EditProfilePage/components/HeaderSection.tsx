import Header from "../../../components/common/Header";

interface HeaderSectionProps {
  isLogin: boolean;
}

const HeaderSection = ({ isLogin }: HeaderSectionProps) => {
  return (
    <div>
      <Header isLogin={isLogin} />
    </div>
  );
};

export default HeaderSection;
