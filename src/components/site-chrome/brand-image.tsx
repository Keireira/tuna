import Image from 'next/image';
import fish from '../../../public/assets/icons/fish.png';

const BrandImage = () => <Image src={fish} alt="" width={44} height={44} sizes="44px" />;

export default BrandImage;
