// Component for dragging and dropping images which will be sent to ML Model for detection
"use client"
import LeafSVG from "@/components/assets/Leaf"
import { Button } from "@/components/ui/button"
import { ChangeEvent, FormEvent, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import Result from "@/components/result"
import { ReloadIcon } from "@radix-ui/react-icons"

interface FormData {
  images: string[]
  modifiers: string[]
  language: string
  details: string[]
}

export function ImageBox() {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [formData, setFormData] = useState<FormData[]>([])
  const [imageURL, setImageURL] = useState<string>()
  const { toast } = useToast()

  function onImageUpload(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0]) return
    setImageFile(e.target.files[0] ?? null)
    toast({
      variant: "success",
      title: "Image Uploaded",
      description: `${e.target.files[0].name} Uploaded Successfully`,
    })
    setImageURL(URL.createObjectURL(e.target.files[0]))
  }

  const { isInitialLoading, data, refetch } = useQuery({
    queryKey: ["plantData"],
    enabled: false,
    retry: 1, // Limit retries
    queryFn: async () => {
      try {
        const response = await fetch(
          "https://plant.id/api/v3/new_identification",
          {
            method: "POST", 
            headers: {
              "Api-Key": process.env.NEXT_PUBLIC_PLANT_ID_API_KEY!,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData[0]),
          }
        );
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to analyze image. Please try again later.",
        });
        throw error;
      }
    },
  })

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!imageFile) return

    let reader = new FileReader()

    // Convert image to Base64 and make API call
    reader.onload = async function() {
      const base64String = (reader.result as string).split(',')[1] // Remove data:image/jpeg;base64,
      
      const bodyData = {
        images: [base64String],
        modifiers: ["similar_images"],
        language: "en",
        details: ["local_name", "description", "url", "treatment", "classification", "common_names", "cause"]
      }

      setFormData([bodyData])
      await refetch()
    }

    reader.readAsDataURL(imageFile)
  }

  return (
    <section className="mt-8 md:mt-4">
      <form encType="multipart/form-data" method="post" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center">
          <label htmlFor="plant-image" className="cursor-pointer">
            <div className="relative w-72 mt-4 flex items-center justify-center aspect-square mx-auto border-2 dark:border-white border-black border-dashed rounded-lg">
              {imageURL ? (
                <Image src={imageURL} alt="Image" fill className="rounded-lg" />
              ) : (
                <div className="flex flex-col gap-2 p-4 justify-center items-center">
                  <LeafSVG />
                  <p className="text-center">Upload Plant Image Here</p>
                </div>
              )}
              <input
                type="file"
                name="plant-image"
                id="plant-image"
                className="hidden"
                accept=".png, .jpeg, .jpg"
                onChange={onImageUpload}
                required
              />
            </div>
          </label>
          <div className="mt-4">
            {imageFile === null ? (
              <Button disabled className="select-none">
                Add Image to Proceed
              </Button>
            ) : (
              <div className="flex flex-col justify-center gap-4 items-center">
                <p>{imageFile.name} Uploaded!</p>
                {/* Disable the button when the process is running or already previous data is there */}
                <Button type="submit" disabled={isInitialLoading || data}>
                  {isInitialLoading && (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Detect Disease
                </Button>
              </div>
            )}
          </div>
        </div>
      </form>
      {data ? <Result data={data} /> : ""}
    </section>
  )
}