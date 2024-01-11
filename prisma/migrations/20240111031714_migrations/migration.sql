-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "login" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "bonus" INTEGER NOT NULL DEFAULT 0,
    "avatar_path" TEXT NOT NULL DEFAULT '/uploads/avatars/default-avatar.png',
    "remember_token" TEXT,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_category" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "image_path" TEXT NOT NULL,
    "background_image" TEXT NOT NULL,
    "phone_image" TEXT NOT NULL,

    CONSTRAINT "Product_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Calculator_variation" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "step" INTEGER NOT NULL,
    "max" INTEGER NOT NULL,
    "piece_price" INTEGER NOT NULL,
    "calculator_id" INTEGER,
    "calculator_additional_id" INTEGER,

    CONSTRAINT "Calculator_variation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Calculator_tariff" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "calculator_id" INTEGER,

    CONSTRAINT "Calculator_tariff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Calculator_additional" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "enable_link" BOOLEAN NOT NULL DEFAULT false,
    "link" TEXT NOT NULL DEFAULT 'Ссылка на открытый аккаунт',
    "is_active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Calculator_additional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Calculator" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "enable_link" BOOLEAN NOT NULL DEFAULT false,
    "link" TEXT NOT NULL DEFAULT 'Ссылка на открытый аккаунт',
    "enable_sale" BOOLEAN NOT NULL DEFAULT false,
    "sale_percent" INTEGER,
    "max_percent" INTEGER,
    "per_price" INTEGER,
    "product_category_id" INTEGER,

    CONSTRAINT "Calculator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_type" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "Product_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_group" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Product_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_service_item" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "product_service_id" INTEGER,

    CONSTRAINT "Product_service_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_service" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "product_variation_id" INTEGER NOT NULL,

    CONSTRAINT "Product_service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_about_item" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "product_about_id" INTEGER NOT NULL,

    CONSTRAINT "Product_about_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_about" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "Product_about_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_principle" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_path" TEXT NOT NULL,
    "product_id" INTEGER,

    CONSTRAINT "Product_principle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_get" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_path" TEXT NOT NULL,
    "product_id" INTEGER,

    CONSTRAINT "Product_get_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "rating" INTEGER NOT NULL,
    "product_variation_id" INTEGER NOT NULL,
    "user_id" INTEGER,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_variation" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "class" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "sale_price" INTEGER,
    "price" INTEGER NOT NULL,
    "bought_times" INTEGER NOT NULL,
    "composition" TEXT NOT NULL,
    "information" TEXT NOT NULL,
    "short_description" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "product_id" INTEGER,

    CONSTRAINT "Product_variation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "video_poster" TEXT,
    "video_path" TEXT,
    "related_ids" INTEGER[],
    "views" INTEGER NOT NULL DEFAULT 0,
    "user_id" INTEGER,
    "product_type_id" INTEGER,
    "product_group_id" INTEGER,
    "product_category_id" INTEGER,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Product_category_name_key" ON "Product_category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_category_slug_key" ON "Product_category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Calculator_product_category_id_key" ON "Calculator"("product_category_id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_type_name_key" ON "Product_type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_type_slug_key" ON "Product_type"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Product_group_name_key" ON "Product_group"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_group_slug_key" ON "Product_group"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Product_service_product_variation_id_key" ON "Product_service"("product_variation_id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_about_product_id_key" ON "Product_about"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_variation_class_key" ON "Product_variation"("class");

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- AddForeignKey
ALTER TABLE "Calculator_variation" ADD CONSTRAINT "Calculator_variation_calculator_id_fkey" FOREIGN KEY ("calculator_id") REFERENCES "Calculator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calculator_variation" ADD CONSTRAINT "Calculator_variation_calculator_additional_id_fkey" FOREIGN KEY ("calculator_additional_id") REFERENCES "Calculator_additional"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calculator_tariff" ADD CONSTRAINT "Calculator_tariff_calculator_id_fkey" FOREIGN KEY ("calculator_id") REFERENCES "Calculator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calculator" ADD CONSTRAINT "Calculator_product_category_id_fkey" FOREIGN KEY ("product_category_id") REFERENCES "Product_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_service_item" ADD CONSTRAINT "Product_service_item_product_service_id_fkey" FOREIGN KEY ("product_service_id") REFERENCES "Product_service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_service" ADD CONSTRAINT "Product_service_product_variation_id_fkey" FOREIGN KEY ("product_variation_id") REFERENCES "Product_variation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_about_item" ADD CONSTRAINT "Product_about_item_product_about_id_fkey" FOREIGN KEY ("product_about_id") REFERENCES "Product_about"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_about" ADD CONSTRAINT "Product_about_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_principle" ADD CONSTRAINT "Product_principle_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_get" ADD CONSTRAINT "Product_get_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_product_variation_id_fkey" FOREIGN KEY ("product_variation_id") REFERENCES "Product_variation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_variation" ADD CONSTRAINT "Product_variation_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_product_type_id_fkey" FOREIGN KEY ("product_type_id") REFERENCES "Product_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_product_group_id_fkey" FOREIGN KEY ("product_group_id") REFERENCES "Product_group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_product_category_id_fkey" FOREIGN KEY ("product_category_id") REFERENCES "Product_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
