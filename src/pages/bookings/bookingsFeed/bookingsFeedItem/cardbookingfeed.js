import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { CodeBracketIcon, EllipsisVerticalIcon, FlagIcon, StarIcon } from '@heroicons/react/20/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function CardBooking() {
  return (
    <div className="bg-white px-4 py-5 sm:px-6 shadow-xl max-w-7xl mx-6 rounded-lg w-full ">
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <img
            className="h-10 w-10 rounded-full"
            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-gray-900">
            <a href="#" className="hover:underline">
              Chelsea Hagon
            </a>
          </p>
          <p className="text-sm text-gray-500">
            <a href="#" className="hover:underline">
              December 9 at 11:43 AM - December 9 at 12:43 AM
            </a>
          </p>
        </div>
        <div className="flex flex-shrink-0 self-center">
        <span className="inline-flex items-center gap-x-1.5 rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
        <svg class="w-2.5 h-2.5 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
</svg>
3 days left
</span>
        </div>
      </div>
      <h1 className="text-xl font-bold text-gray-900 mt-4 max-w-3xl ">
        Price : £189
      </h1>
      <p className="text-sm text-gray-900 mt-2 max-w-6xl">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo impedit sapiente recusandae iusto officiis dolor? Laborum quibusdam quam, quidem vel assumenda repellat inventore sint nesciunt, ullam asperiores magnam placeat eveniet. Aliquam voluptatibus assumenda distinctio veniam quam tempora modi aperiam nemo voluptate reprehenderit quidem, nisi vero est.
      </p>
      
     <div className="flex items-start gap-2.5 mt-6 bg-gray-100 p-6 rounded-lg shadow-sm">
    <img className="w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Jese image"/>
    <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold text-gray-900">Sami Ribardiere</span>
        </div>
        <p className="text-sm font-normal py-2 text-gray-900">That's awesome. I think our users will really appreciate the improvements.</p>
        <div className="inline-flex "> 
            <span className="inline-flex items-center gap-x-1.5 rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                <svg className="h-1.5 w-1.5 fill-red-500" viewBox="0 0 6 6" aria-hidden="true">
                  <circle cx={3} cy={3} r={3} />
                </svg>
                Rejected By Artist
            </span>
        </div>
    </div>
</div>





      
    </div>
  );
}
