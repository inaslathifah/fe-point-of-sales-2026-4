import { useState } from "react";
// import { Container, Form, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../component/ui/card";
import { Input } from "../component/ui/input";
import { Label } from "@/component/ui/label";
import { Button } from "@/component/ui/button";
import api from "@/services/api";

export default function Login() {
  const navigate = useNavigate();
  const _initialForm = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(_initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    console.log(`input change ${e.target.name} = ${e.target.value}`);
    // PreventDefault itu untuk mencegah halaman melakukan refresh ketika form di submit.
    // Dia adalah parameter dari event, jadi kita bisa memanggilnya di dalam function handleSubmit.
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.post("/auth/login", formData);
      console.log(res.data.token);
      
      localStorage.setItem("token", res.data.token);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      console.log(error.message);
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4 bg-black">
      <div className="w-full max-w-md">
        <div className="mb-6 flex flex-col items-center">
          {/* <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-sm shadow"></div> */}
          <h1 className="text-2xl font-bold tracking-tight">
            Point of Sales | PPKDJP
          </h1>
          <p
            className="text-sm text-black,
          "
          >
            Point of Sales
          </p>
        </div>

        <Card className="shadow-lg border-border p-6">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-lg font-semibold">
              Sign in Your Account
            </CardTitle>
            <CardDescription>Enter your Credential</CardDescription>
            {errorMsg && <p className="text-red-600">{errorMsg}</p>}
          </CardHeader>

          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your Email"
                  required
                  autoFocus
                />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your Password"
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3 pt-3">
              <Button type="submit" className="rounded-lg w-full">
                {isLoading ? "Loading..." : "Sign in"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
