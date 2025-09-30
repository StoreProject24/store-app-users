import { useStoreStore } from "@/store/store";

const Contact = () => {
  const { store } = useStoreStore();

  console.log("store ", store);

  return (
    <div>
      <h1>Contact</h1>
    </div>
  );
};

export default Contact;
