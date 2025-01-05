import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Giscus from "@giscus/react";
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'github-markdown-css';

const ImageModal = ({ selectedImage, closeModal }) => {
  const [imageDetails, setImageDetails] = useState('');

  useEffect(() => {
    const fetchImageDetails = async () => {
      try {
        const response = await fetch(`/details/${selectedImage.replace(/\.[^/.]+$/, '')}.md`);
        setImageDetails(await response.text());
      } catch (error) { }
    };
    fetchImageDetails();
  }, [selectedImage]);

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>
          ×
        </button>
        <br />
        <img
          src={`/img/${selectedImage}`}
          className="modal-image"
        />
        <div className="markdown-body">
          {imageDetails && imageDetails.charAt(0) !== '<' ? (
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {imageDetails}
            </ReactMarkdown>
          ) : null}
        </div>
        <div className="details-buttons">
          <a title="查看大图"
            href={`/img/${selectedImage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="button"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 5 40 40"
              xmlns="http://www.w3.org/2000/svg"
              fill="#ed6d3d"
            >
              <path d="M22.954,33.818c2.883,0,5.606-1.022,7.773-2.881l10.534,10.56c0.195,0.196,0.452,0.294,0.708,0.294 c0.255,0,0.511-0.098,0.706-0.292c0.391-0.39,0.392-1.023,0.002-1.414L32.134,29.517c3.947-4.714,3.717-11.773-0.705-16.205 c-2.264-2.27-5.274-3.52-8.476-3.52s-6.212,1.25-8.476,3.52c-4.671,4.684-4.671,12.304,0,16.987 C16.742,32.568,19.752,33.818,22.954,33.818z M15.895,14.724c1.886-1.891,4.393-2.932,7.06-2.932s5.174,1.041,7.06,2.932 c3.895,3.905,3.895,10.258,0,14.163c-1.886,1.891-4.393,2.932-7.06,2.932s-5.174-1.041-7.06-2.932 C12,24.981,12,18.629,15.895,14.724z"></path>{" "}
              <path d="M18.475,22.782h3.753v3.753c0,0.553,0.448,1,1,1s1-0.447,1-1v-3.753h3.752c0.552,0,1-0.447,1-1s-0.448-1-1-1h-3.752v-3.753 c0-0.553-0.448-1-1-1s-1,0.447-1,1v3.753h-3.753c-0.552,0-1,0.447-1,1S17.922,22.782,18.475,22.782z"></path>
            </svg>
          </a>
          <a title="下载图片" href={`/img/${selectedImage}`} download className="button">
            <svg
              width="32"
              height="32"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              fill="#ed6d3d"
            >
              <path d="M5.36891 8.08074L7.50833 10.2202V4.46802H8.50833V10.1473L10.5749 8.08074L11.282 8.78784L8.32545 11.7444H7.61835L4.6618 8.78784L5.36891 8.08074Z" />
              <path d="M14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8ZM13 8C13 10.7614 10.7614 13 8 13C5.23858 13 3 10.7614 3 8C3 5.23858 5.23858 3 8 3C10.7614 3 13 5.23858 13 8Z" />
            </svg>
          </a>
        </div>
        <Giscus
          repo="Coin-233/imgbox"
          repoId="R_kgDONkM6tg"
          category="General"
          categoryId="DIC_kwDONkM6ts4Clt0D"
          mapping="specific"
          term={selectedImage}
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="bottom"
          theme="preferred_color_scheme"
          lang="zh-CN"
        />
      </div>
    </div>
  );
};

export default ImageModal;
