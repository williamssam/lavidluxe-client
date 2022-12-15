import { ChevronLeftIcon } from '@heroicons/react/20/solid'
import Head from 'next/head'
import Image from 'next/image'
import hero from '../public/hero.jpg'

const Checkout = () => {
  return (
    <>
      <Head>
        <title>Checkout - Lavidluxe</title>
      </Head>

      <main className='min-h-screen transition-all grid grid-cols-5 w-screen overflow-x-hidden'>
        <section className='pl-40 pr-20 py-20 col-span-3'>
          <h1 className='font-vollkorn font-bold text-xl'>Lavidluxe</h1>

          {/* form steps */}
          <p className='text-xs pt-2 flex gap-2'>
            <span className='text-main font-bold'>Information</span> &gt;{' '}
            <span className='font-bold text-gray-700'>Shipping</span> &gt;{' '}
            <span>Payment</span>
          </p>

          {/* information */}
          {/* <form>
            <div className='mt-10'>
              <div className='flex items-center justify-between text-xs'>
                <h3 className='uppercase tracking-[4px] text-xs font-bold text-gray-700'>
                  Contact information
                </h3>
                <p>
                  Already have an account?{' '}
                  <span className='text-main'>Log in</span>
                </p>
              </div>

              <TextInput
                label='Email address'
                type='email'
                id='email'
                placeholder='Enter your email address'
              />
            </div>

            <div className='mt-10'>
              <div className='flex items-center justify-between text-xs'>
                <h3 className='uppercase tracking-[4px] text-xs font-bold text-gray-700'>
                  Shipping address
                </h3>
              </div>

              <TextInput
                label='Country'
                type='text'
                id='country'
                placeholder='Enter your country'
              />
              <TextInput
                label='full name'
                type='text'
                id='full-name'
                placeholder='Enter your full name (first name, last-name)'
              />
              <TextInput
                label='Address'
                type='text'
                id='address'
                placeholder='Enter your address'
              />

              <div className='flex items-center justify-between w-full'>
                <TextInput
                  label='City'
                  type='text'
                  id='city'
                  placeholder='Enter your city'
                />
                <TextInput
                  label='State'
                  type='text'
                  id='state'
                  placeholder='Enter your state'
                />
                <TextInput
                  label='Postal code'
                  type='text'
                  id='postal-code'
                  placeholder='Enter your postal code'
                />
              </div>
              <div className='flex items-center gap-2 pt-5'>
                <input type='checkbox' name='accept' id='accept' />
                <label htmlFor='accept' className='text-sm'>
                  Save this information for next time
                </label>
              </div>
            </div>

            <footer className='flex items-center justify-between mt-10'>
              <p className='text-sm flex items-center text-main'>
                <ChevronLeftIcon className='w-6 h-6' />
                <span>Return to cart</span>
              </p>
              <button
                type='submit'
                className='flex justify-center bg-[#333333] text-white py-4 px-10 text-xs font-bold uppercase tracking-[5px] transition-all hover:border-main hover:bg-main active:scale-95'>
                Continue to shipping
              </button>
            </footer>
          </form> */}

          <div className='text-xs border border-gray-300 rounded py-4 px-6 mt-10 flex flex-col gap-4'>
            <div className='flex items-center justify-between border-b pb-3'>
              <div className='flex items-center gap-10'>
                <p>Contact</p>
                <p className='font-bold'>williamsdamisamuel@outlook.com</p>
              </div>
              <button className='text-main font-bold'>change</button>
            </div>
            <div className='flex items-center justify-between border-b pb-3'>
              <div className='flex items-center gap-10'>
                <p>Ship to</p>
                <p className='font-bold'>Lawal Bus Stop, Ikotun LA, Nigeria</p>
              </div>
              <button className='text-main font-bold'>change</button>
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-10'>
                <p>Method</p>
                <p className='font-bold'>Shipping outside Lagos. $50.00</p>
              </div>
              {/* <button>change</button> */}
            </div>
          </div>

          <div className='mt-14'>
            <div className='flex items-center justify-between text-xs'>
              <h3 className='uppercase tracking-[4px] text-xs font-bold text-gray-700'>
                Payment
              </h3>
              <p>All transactions are secure and encrypted.</p>
            </div>

            <div className='pt-3'>
              <p>Cash on Delivery (COD)</p>
              <p>Paystack</p>
            </div>

            <footer className='flex items-center justify-between mt-10'>
              <p className='text-sm flex items-center text-main'>
                <ChevronLeftIcon className='w-6 h-6' />
                <span>Return to information</span>
              </p>
              <button
                type='submit'
                className='flex justify-center bg-[#333333] text-white py-4 px-10 text-xs font-bold uppercase tracking-[5px] transition-all hover:border-main hover:bg-main active:scale-95'>
                Continue to shipping
              </button>
            </footer>
          </div>
        </section>

        <section className='bg-gray-100 h-full col-span-2 p-20'>
          <div className='border-b border-b-gray-300 pb-3'>
            <div className='flex items-center gap-5 border-b border-dashed pb-5'>
              <Image
                src={hero}
                alt='product image'
                className='w-16 object-cover'
              />
              <div className='text-xs font-bold w-full flex items-center justify-between'>
                <div>
                  <h4 className='uppercase tracking-[4px] text-[#333333]'>
                    The skinny
                  </h4>
                  <p className='text-[#999999] capitalize pt-1'>Small/blue</p>

                  <p className='text-gray-500 pt-3'>Quantity: 10</p>
                </div>

                <p className='text-base font-bold text-[#333333]'>$ 175.00</p>
              </div>
            </div>
          </div>

          <div className='border-b border-b-gray-300 py-5'>
            <div className='flex items-center justify-between'>
              <p className='text-sm'>Subtotal</p>
              <p className='text-gray-700 font-bold'>$345.00</p>
            </div>
            <div className='flex items-center justify-between mt-2'>
              <p className='text-sm'>Shipping</p>
              <p className='text-gray-700 font-bold'>$35.00</p>
            </div>
          </div>

          <div className='flex items-center justify-between pt-6'>
            <p>Total</p>
            <p className='text-lg text-gray-700 font-bold'>$362.50</p>
          </div>
        </section>
      </main>
    </>
  )
}
export default Checkout
