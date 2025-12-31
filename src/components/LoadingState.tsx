import { motion } from "framer-motion";
import { Wind } from "lucide-react";

interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({ message = "Loading data..." }: LoadingStateProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="relative mb-6"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Wind className="w-12 h-12 text-primary" />
        <motion.div
          className="absolute inset-0 bg-primary/30 rounded-full blur-xl"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
      <p className="text-muted-foreground">{message}</p>
    </motion.div>
  );
}
