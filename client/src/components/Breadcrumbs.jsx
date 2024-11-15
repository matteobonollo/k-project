import React from "react";
import { Link, useLocation } from "react-router-dom";

function Breadcrumbs() {
  const location = useLocation();

  let breadcrumbLink;
  let breadcrumbText;

  if (location.pathname.includes("/collection/")) {
    breadcrumbLink = "/collection";
    breadcrumbText = "Catalogo";
  } else {
    breadcrumbLink = "/";
    breadcrumbText = "Home";
  }

  return (
    <div className="flex items-center space-x-2">
      {breadcrumbLink && (
        <Link
          to={breadcrumbLink}
          className="text-lg font-bold text-black hover:text-gray-600"
        >
          &lt; {breadcrumbText}
        </Link>
      )}
    </div>
  );
}

export default Breadcrumbs;
