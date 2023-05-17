import React, { useEffect, useState } from 'react';

const ImageUploadForm = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const selectedFiles = Array.from(files);
      setSelectedImages((prevImages) => [...prevImages, ...selectedFiles]);
    }
  };

  useEffect(() => {
    console.log(selectedImages);
  }, [selectedImages]);
  return (
    <div>
      <input type="file" multiple onChange={handleImageChange} />
      <div>
        {selectedImages.map((image, index) => (
          <img
            key={index}
            src={URL.createObjectURL(image)}
            alt={`이미지 ${index + 1}`}
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageUploadForm;
