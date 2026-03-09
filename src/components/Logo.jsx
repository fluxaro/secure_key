import { Shield } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Shield className="w-8 h-8 text-yellow-400" />
      <span className="text-2xl font-bold text-white">SecureKey</span>
    </div>
  );
};

export default Logo;
