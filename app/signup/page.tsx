import { isCreateAdminAllowed } from "@/lib/allow-create-admin";
import { SignupForm } from "./signup-form";

export default function SignupPage() {
  if (!isCreateAdminAllowed()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow w-96 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-secondary">Գրանցում</h2>
          <p className="text-secondary mb-6">Գրանցումը թույլատրված չէ։</p>
          <a href="/login" className="text-blue-600 text-sm">
            Մուտք
          </a>
        </div>
      </div>
    );
  }

  return <SignupForm />;
}
