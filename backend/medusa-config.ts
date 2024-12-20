import { loadEnv, Modules, defineConfig } from '@medusajs/utils';
import { resolve } from 'path';

const isDev = process.env.NODE_ENV === 'development';

loadEnv(process.env.NODE_ENV, process.cwd());

const backendUrl = process.env.RAILWAY_PUBLIC_DOMAIN_VALUE || 'http://localhost:9000';

const PAYSTACK_SECRET_KEY = "pk_test_13736085a74e0bda5aacbc620ba4e40fb26097c2";

const plugins = [


];

const modules = {
  [Modules.PAYMENT]: {
    resolve: "@medusajs/medusa/payment",
    options: {
      providers: [
        {
          resolve: "medusa-payment-paystack",
          id: "paystack",
          options: {
            secret_key: PAYSTACK_SECRET_KEY,
          } satisfies import("medusa-payment-paystack").PluginOptions,
        },
      ],
    },
  },

  [Modules.AUTH]: {
    resolve: "@medusajs/auth",
    options: {
      providers: [
        {
          resolve: "@medusajs/auth-emailpass",
          id: "emailpass",
          options: {},
        },
      ],
    },
  },
  [Modules.FILE]: {
    resolve: "@medusajs/file",
    options: {
      providers: [
        {
          resolve: "@medusajs/file-local",
          id: "local",
          options: {
            upload_dir: "static",
            backend_url: `${backendUrl}/static`,
          },
        },
      ],
    },
  },
};

// Redis configuration
if (process.env.REDIS_URL) {
  console.log('Redis url found, enabling event bus with redis');
  modules[Modules.EVENT_BUS] = {
    resolve: '@medusajs/event-bus-redis',
    options: { 
      redisUrl: process.env.REDIS_URL
    }
  };
}


// SendGrid notification provider
const sendgridApiKey = process.env.SENDGRID_API_KEY;
const sendgridFrom = process.env.SENDGRID_FROM_EMAIL;
const sendgridConfigured = sendgridApiKey && sendgridFrom;
if (sendgridConfigured) {
  console.log('SendGrid api key and from address found, enabling SendGrid notification provider');
  modules[Modules.NOTIFICATION] = {
    resolve: '@medusajs/notification',
    options: {
      providers: [
        {
          resolve: '@medusajs/notification-sendgrid',
          id: 'sendgrid',
          options: {
            channels: ['email'],
            api_key: sendgridApiKey,
            from: sendgridFrom
          }
        }
      ]
    }
  };
}

// Resend notification provider
const resendApiKey = process.env.RESEND_API_KEY;
const resendFrom = process.env.RESEND_FROM;
const resendConfigured = resendApiKey && resendFrom;
if (resendConfigured) {
  console.log('Resend api key and from address found, enabling Resend notification provider');
  modules[Modules.NOTIFICATION] = {
    resolve: '@medusajs/notification',
    options: {
      providers: [{
        resolve: '@typed-dev/medusa-notification-resend',
        id: 'resend',
        options: {
          channels: ['email'],
          api_key: resendApiKey,
          from: resendFrom
        }
      }]
    }
  };
}


/** @type {import('@medusajs/medusa').ConfigModule['projectConfig']} */
const projectConfig = {
  http: {
    adminCors: process.env.ADMIN_CORS,
    authCors: process.env.AUTH_CORS,
    storeCors: process.env.STORE_CORS,
    jwtSecret: process.env.JWT_SECRET,
    cookieSecret: process.env.COOKIE_SECRET
  },
  database_url: process.env.DATABASE_URL,
  database_type: 'postgres',
  ...(process.env.REDIS_URL && { redisUrl: process.env.REDIS_URL })
};

const completeConfig = {
  projectConfig,
  plugins,
  modules,
  admin: {
    ...!isDev && { backendUrl }
  }
};

export default defineConfig(completeConfig);
export { backendUrl };
