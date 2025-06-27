import { useState } from "react";
import { Star } from "lucide-react"; // You can use Lucide, HeroIcons, or any icon lib

export const Rating = ({ label , setFormData , formData} : any) => {
  const [rating, setRating] = useState<number>(0);

  return (
    <div className="mb-2 ml-4">
      <p className="font-medium">{label}</p>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((val) => (
          <Star
            key={val}
            onClick={() => {
              setRating(val)
              setFormData({
                ...formData,
                [label] : val

              })
            }}
            className={`w-4 h-4 cursor-pointer transition-colors ${
              val <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
             
            }`}
          />
        ))}
      </div>
    </div>
  );
};
