import React, { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";


export function SignIn() {
  const [email, setEmail] = useState("");
  const [passwordhash, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log("mới submit")
    try{
      const response = await fetch("http://localhost:5138/admin/auth/login", {
        method: "POST", 
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({email,passwordhash,}),
      });
      if (response.ok){
        const data = await response.json();
        console.log("Response từ server:", data); // Xem dữ liệu thực tế

        // Giả sử API trả về { token: "..." }
        if (data.token) {
          localStorage.setItem("token", data.token);
          navigate("/dashboard/home", { replace: true });
          console.log("thành công");
        } else {
          setError("Không nhận được token từ server");
        }
      }
      else {
        const data = await response.text();
        console.log(data);
        setError(data || "Đăng nhập thất bại");
      }

    }catch (err) {
      setError("thất bại");
    }

    console.log("Email:", email, "Password:", passwordhash);
  };

  return (
    <section className="m-8 flex gap-4">
      {/* cột trái: form đăng nhập  */}
      <div className="w-full lg:w-3/5 mt-24">
        {/* tiêu đề  */}
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
        </div>
        {/* form đăng nhập  */}
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit}> 
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            {/* ô nhập email */}
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value = {email}
              onChange = {(e) => setEmail(e.target.value)}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            {/* ô nhập mật khẩu */}
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value = {passwordhash}
              onChange = {(e) => setPassword(e.target.value)}
            />
          </div>

          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                I agree the&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />

          {/* nút đăng nhập  */}
          <Button className="mt-6" fullWidth type ="submit">
            Sign In
          </Button>

          {error && (
            <Typography color="red" className="mt-2 text-center">
              {error}
            </Typography>
          )}

        </form>

      </div>
      {/* cột phải: hình ảnh minh họa */}
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>

    </section>
  );
}

export default SignIn;
