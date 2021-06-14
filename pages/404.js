// import Image from "next/image";
import { useRouter } from "next/router";

export default function Page404() {
  const router = useRouter();
  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex flex-column align-items-center justify-content-center"
    >
      {/* <Image src="/404.gif" width={550} height={500} /> */}

      <h1 style={{ fontSize: "82px", fontWeight: "800" }}>404</h1>
      <p style={{ width: "30%" }}>
        Ooops... The page that you are looking for is doesn't exist. You can go
        back to your home now.
      </p>
      <button
        style={{ marginTop: "50px", width: "25%" }}
        className="btn btn-primary"
        onClick={() => router.push("/dashboard")}
      >
        Back to home...
      </button>
    </div>
  );
}
