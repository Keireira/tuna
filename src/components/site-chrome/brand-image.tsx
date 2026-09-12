import Image from 'next/image';
import fish from '../../../public/assets/icons/fish.png';

const BrandImage = () => <Image src={fish} alt="" sizes="(max-width: 720px) 38px, 44px" />;

export default BrandImage;
