import { MapPin, Phone, Mail } from 'lucide-react';
import { useStoreStore } from '@/store/store';
import IcFacebook from '@/components/icons/IcFacebook';
import IcInstagram from '@/components/icons/IcInstagram';
import IcTiktok from '@/components/icons/IcTiktok';
import IcX from '@/components/icons/IcX';
import { useCallback, useMemo } from 'react';

const Footer = () => {
  const { store } = useStoreStore();

  const socialMedia = useMemo(
    () => [
      {
        name: 'Facebook',
        url: store.facebook,
        icon: <IcFacebook color="#000000" className="w-6 h-6 dark:fill-white" />,
      },
      {
        name: 'Instagram',
        url: store.instagram,
        icon: <IcInstagram color="#000000" className="w-6 h-6 dark:fill-white" />,
      },
      {
        name: 'Tiktok',
        url: store.tiktok,
        icon: <IcTiktok color="#000000" className="w-6 h-6 dark:fill-white" />,
      },
      {
        name: 'X',
        url: store.twitter,
        icon: <IcX color="#000000" />,
      },
    ],
    [store]
  );

  const aboutUs = useMemo(
    () => [
      {
        name: 'Quienes somos',
        url: '/quienes-somos',
      },
      {
        name: 'Política de privacidad',
        url: '/politica-de-privacidad',
      },
      {
        name: 'Términos y condiciones',
        url: '/terminos-y-condiciones',
      },
    ],
    []
  );

  const RenderAboutUs = useCallback(() => {
    return (
      <div className="hidden w-1/2 gap-4 sm:flex flex-col sm:visible sm:items-center ">
        <h5 className="text-center  text-black font-poppins text-2xl font-bold dark:text-white">
          Acerca de nosotros
        </h5>
        <div className="flex flex-col items-start gap-2">
          {aboutUs.map(item => (
            <a
              href={item.url}
              key={item.name}
              className="text-left text-gray-500 font-poppins text-sm capitalize hover:underline"
            >
              <p
                className="text-gray-500 text-left font-poppins text-sm capitalize"
                key={item.name}
              >
                {item.name}
              </p>
            </a>
          ))}
        </div>
      </div>
    );
  }, [aboutUs]);

  const RenderContact = useCallback(() => {
    return (
      <div className="flex flex-col w-full items-center gap-2 sm:w-1/2">
        <h5 className="text-center mb-2 text-black font-poppins text-2xl font-bold dark:text-white">
          Contacto
        </h5>
        <ul className="flex flex-col gap-2 justify-start w-full sm:w-1/2">
          <li className="flex flex-row justify-start items-center gap-2">
            <MapPin color="#000000" className="w-6 h-6 dark:fill-white" />
            <p className="text-center text-gray-500 font-poppins text-sm capitalize">
              {store.address} - {store.city}
            </p>
          </li>
          <li className="flex flex-row justify-start items-center gap-2">
            <Phone color="#000000" className="w-6 h-6 dark:fill-white" />
            <p className="text-center text-gray-500 font-poppins text-sm">{store.phone}</p>
          </li>
          <li className="flex flex-row justify-start items-center gap-2">
            <Mail color="#000000" className="w-6 h-6 dark:fill-white" />
            <p className="text-center text-gray-500 font-poppins text-sm">{store.email}</p>
          </li>
        </ul>
      </div>
    );
  }, [store]);

  const RenderSocialMedia = useCallback(() => {
    return (
      <div className="flex flex-row justify-center items-center gap-2 my-4">
        {socialMedia.map(
          item =>
            item.url && (
              <a
                href={item.url}
                key={item.name}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-full cursor-pointer border border-gray-300 dark:bg-gray-900 dark:border-gray-900"
              >
                {item.icon}
              </a>
            )
        )}
      </div>
    );
  }, [socialMedia]);

  return (
    <footer className="bg-gray-100 py-8 dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col justify-between items-center gap-4 sm:flex-row">
          <RenderAboutUs />
          <RenderContact />
        </div>
        <RenderSocialMedia />
        <hr />
        <div className="pt-4">
          <p className="text-center text-gray-500 font-poppins">
            &copy; {new Date().getFullYear()} {store.name}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
