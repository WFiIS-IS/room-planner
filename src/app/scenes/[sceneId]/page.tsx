import 'server-only';

const imgSrc = '/house-plan.png';

export default function ScenesPage() {
  return (
    <p>
      <img src={imgSrc} alt="house plan" />
    </p>
  );
}
