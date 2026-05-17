import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Label } from '@radix-ui/react-label'
import { cn } from '@/lib/utils'

const productSchema = z.object({
  name: z.string().min(2, { message: 'Product name must be at least 2 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  price: z.number().min(0.01, { message: 'Price must be greater than 0.' }),
  category: z.string().min(2, { message: 'Category must be at least 2 characters.' }),
  imageUrl: z.string().url({ message: 'Invalid URL' }),
})

type ProductFormValues = z.infer<typeof productSchema>

export default function ProductForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      category: '',
      imageUrl: '',
    },
  })

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    console.log('Form data:', data)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    alert('Product created successfully!')
  }

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-md shadow-md">
      <h2 className="text-lg font-semibold text-gray-800">Create New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <Label htmlFor="name">Product Name</Label>
          <Input id="name" type="text" {...register('name')} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Input id="description" type="text" {...register('description')} />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input id="price" type="number" step="0.01" {...register('price', { valueAsNumber: true })} />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Input id="category" type="text" {...register('category')} />
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>
        <div>
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input id="imageUrl" type="text" {...register('imageUrl')} />
          {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>}
        </div>
        <Button type="submit">Create Product</Button>
      </form>
    </div>
  )
}