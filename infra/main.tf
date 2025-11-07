terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "rg" {
  name     = "soup-web-rg"
  location = "australiaeast"
}

# Storage account for MP3 files
resource "azurerm_storage_account" "storage" {
  name                     = "soupwebstore${random_integer.rand.result}"
  resource_group_name      = azurerm_resource_group.rg.name
  location                 = azurerm_resource_group.rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "random_integer" "rand" {
  min = 10000
  max = 99999
}

# Blob container for songs
resource "azurerm_storage_container" "songs" {
  name                  = "songs"
  storage_account_name  = azurerm_storage_account.storage.name
  container_access_type = "private"
}

# App Service plan for serverless Functions
resource "azurerm_service_plan" "func_plan" {
  name                = "soupweb-func-plan"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku_name            = "Y1"   # Consumption plan
  os_type             = "Linux"
}

# Function App
resource "azurerm_linux_function_app" "func" {
  name                = "soupweb-backend"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  service_plan_id     = azurerm_service_plan.func_plan.id
  storage_account_name       = azurerm_storage_account.storage.name
  storage_account_access_key = azurerm_storage_account.storage.primary_access_key

  site_config {
    application_stack {
      node_version = "20"
    }
  }

  app_settings = {
    "AZURE_STORAGE_KEY" = azurerm_storage_account.storage.primary_access_key
  }
}

