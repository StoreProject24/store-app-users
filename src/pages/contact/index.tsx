import { useCallback, useMemo } from 'react';
import { useStoreStore } from '@/store/store';
import IcFacebook from '@/components/icons/IcFacebook';
import IcInstagram from '@/components/icons/IcInstagram';
import IcTiktok from '@/components/icons/IcTiktok';
import IcWhatsapp from '@/components/icons/IcWhatsapp';

interface SocialMedia {
  id: number;
  name: string;
  icon: React.ReactNode;
  value: string | number | undefined;
}

const Contact = () => {
  const { store } = useStoreStore();

  const socialMedias: SocialMedia[] = useMemo(
    () => [
      {
        id: 1,
        name: 'Facebook',
        icon: <IcFacebook className="w-7 h-7" />,
        value: store.facebook,
      },
      {
        id: 2,
        name: 'WhatsApp',
        icon: <IcWhatsapp className="w-8 h-8" />,
        value: store.phone,
      },
      {
        id: 3,
        name: 'Instagram',
        icon: <IcInstagram className="w-7 h-7" />,
        value: store.instagram,
      },
      {
        id: 4,
        name: 'Tiktok',
        icon: <IcTiktok className="w-7 h-7" />,
        value: store.tiktok,
      },
    ],
    []
  );

  const handleNavigate = useCallback((item: SocialMedia) => {
    if (!item.value) return;
    if (item.name === 'WhatsApp') {
      // @ts-ignore
      const cleanWhatsApp = item.value.replace(/\D/g, '');
      const message = encodeURIComponent('Hola, quiero información');
      window.open(
        `https://wa.me/${cleanWhatsApp}?text=${message}`,
        '_blank',
        'noopener,noreferrer'
      );
    }
  }, []);

  return (
    <section className="w-full p-8 flex flex-1 flex-col h-full">
      <h1 className="text-2xl font-extrabold mb-4 text-center">Contáctanos</h1>
      <article className="flex flex-col justify-center items-center self-center xl:w-1/2">
        <h5 className="text-xl text-gray-500 leading-8">
          Estamos aquí para ayudarte. Si tienes preguntas, deseas más información sobre nuestros
          productos o servicios, o necesitas asesoría personalizada, no dudes en ponerte en contacto
          con nosotros.
          <br />
          <br /> Nuestro equipo estará encantado de atenderte y brindarte una respuesta oportuna y
          clara. Puedes escribirnos a través del formulario de contacto, llamarnos o comunicarte por
          nuestros canales digitales.
        </h5>
        <br />
        <ul className="flex flex-row items-center gap-8 mt-10">
          {socialMedias.map(item => (
            <li key={item.id} onClick={() => handleNavigate(item)} className="cursor-pointer">
              {item.icon}
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
};

export default Contact;
