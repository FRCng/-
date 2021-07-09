import service from "@/utils/request1";

export function getCategory() {
  return service.request({
    url: '/category'
  })
}

export function getSubcategory(maitKey) {
  return service.request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}

export function getCategoryDetail(miniWallkey, type) {
  return service.request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}