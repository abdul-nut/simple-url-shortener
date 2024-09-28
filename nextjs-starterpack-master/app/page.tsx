"use client";

import { title, subtitle } from "@/components/primitives";
import { Formik } from "formik";
import React from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";

export default function Home() {
  const [url, setUrl] = React.useState('');

  const formMutation = useMutation({
    mutationFn: (body: { url: string, slug: string }) => {
      return axiosInstance.post('/short-link', body);
    },
    onSuccess: (data) => {
      toast.success('Short link created');
      setUrl(data.data.url)
    },
    onError: (error: any) => {
      if (error.status === 400) {
        toast.error('Invalid URL or Slug');
      }

      if (error.status === 500) {
        toast.error('Internal Server Error');
      }
    },
  })

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="inline-block max-w-xl text-center justify-center">
        <h1 className={title()}>Website </h1>
        <h1 className={title({ color: 'cyan'})}>URLShortly</h1>
        <h2 className={subtitle()}>Shorten URL easily</h2>
      </div>

      {
        url != '' && (
          <div className={"flex flex-row gap-2"}>
            <Input value={url} />
            <Button color={"primary"} onClick={() => {
              navigator.clipboard.writeText(url);
              toast.success('Link copied');
            }}>Copy</Button>
          </div>
        )
      }

      <Formik initialValues={{
        url: "",
        slug: ""
      }} onSubmit={(values) => {
        formMutation.mutate(values);
        setUrl('')
      }}>
        {({ values, handleSubmit, handleChange }) => (
          <form className={"flex flex-col gap-2"} onSubmit={handleSubmit}>
            <Input
              label="URL"
              placeholder="Enter your URL"
              name={"url"}
              value={values.url}
              onChange={handleChange}
            />
            <Input
              label="Slug"
              placeholder="Enter your slug ex: shortLink"
              name={"slug"}
              value={values.slug}
              onChange={handleChange}
            />
            <Button type={"submit"} color={'primary'} isLoading={formMutation.isPending}>Create</Button>
          </form>
        )}
      </Formik>
    </div>
  );
}
