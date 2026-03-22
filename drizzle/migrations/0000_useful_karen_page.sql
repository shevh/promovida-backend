CREATE TABLE "actions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"created_by_id" uuid,
	"created_by_type" varchar(50) DEFAULT 'SYSTEM' NOT NULL,
	"updated_by_id" uuid,
	"updated_by_type" varchar(50) DEFAULT 'SYSTEM' NOT NULL,
	"deleted_by_id" uuid,
	"deleted_by_type" varchar(50) DEFAULT 'SYSTEM',
	"name" varchar(255) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"objective" text NOT NULL,
	"target_audience" text NOT NULL,
	"frequency" varchar(50) NOT NULL,
	"days_of_week" jsonb DEFAULT '[]'::jsonb,
	"time" varchar(100),
	"how_to_access" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"tenant_id" uuid NOT NULL,
	CONSTRAINT "actions_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "action_feedbacks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"created_by_id" uuid,
	"created_by_type" varchar(50) DEFAULT 'SYSTEM' NOT NULL,
	"updated_by_id" uuid,
	"updated_by_type" varchar(50) DEFAULT 'SYSTEM' NOT NULL,
	"deleted_by_id" uuid,
	"deleted_by_type" varchar(50) DEFAULT 'SYSTEM',
	"user_id" uuid NOT NULL,
	"action_id" uuid NOT NULL,
	"participation_id" uuid,
	"rating" integer NOT NULL,
	"comment" text,
	"would_recommend" boolean DEFAULT true,
	"improvement_suggestions" text,
	"feedback_date" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "action_locations" (
	"action_id" uuid NOT NULL,
	"address_id" uuid NOT NULL,
	CONSTRAINT "action_locations_action_id_address_id_pk" PRIMARY KEY("action_id","address_id")
);
--> statement-breakpoint
CREATE TABLE "addresses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"created_by_id" uuid,
	"created_by_type" varchar(50) DEFAULT 'SYSTEM' NOT NULL,
	"updated_by_id" uuid,
	"updated_by_type" varchar(50) DEFAULT 'SYSTEM' NOT NULL,
	"deleted_by_id" uuid,
	"deleted_by_type" varchar(50) DEFAULT 'SYSTEM',
	"country_id" uuid NOT NULL,
	"state_id" uuid,
	"line1" varchar(255) NOT NULL,
	"line2" varchar(255),
	"neighborhood" varchar(120) NOT NULL,
	"postal_code" varchar(50) NOT NULL,
	"city" varchar(255) NOT NULL,
	"latitude" numeric(10, 8),
	"longitude" numeric(10, 8),
	"notes" text,
	"is_active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "badges" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"created_by_id" uuid,
	"created_by_type" varchar(50) DEFAULT 'SYSTEM' NOT NULL,
	"updated_by_id" uuid,
	"updated_by_type" varchar(50) DEFAULT 'SYSTEM' NOT NULL,
	"deleted_by_id" uuid,
	"deleted_by_type" varchar(50) DEFAULT 'SYSTEM',
	"name" varchar(100) NOT NULL,
	"description" text NOT NULL,
	"icon" varchar(50) NOT NULL,
	"points" integer DEFAULT 10 NOT NULL,
	"criteria" text,
	"category" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "countries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"iso_alpha2" varchar(2) NOT NULL,
	"iso_alpha3" varchar(3) NOT NULL,
	"iso_numeric" varchar(3) NOT NULL,
	"dialing_code" varchar(15),
	"currency_code" varchar(3) NOT NULL,
	"default_language" varchar(10) NOT NULL,
	"region" varchar(255),
	"subregion" varchar(255),
	"timezone" varchar(255) DEFAULT 'UTC' NOT NULL,
	"i18n_key" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"created_by_id" uuid,
	"created_by_type" varchar(50) DEFAULT 'SYSTEM' NOT NULL,
	"updated_by_id" uuid,
	"updated_by_type" varchar(50) DEFAULT 'SYSTEM' NOT NULL,
	"deleted_by_id" uuid,
	"deleted_by_type" varchar(50) DEFAULT 'SYSTEM',
	CONSTRAINT "countries_name_unique" UNIQUE("name"),
	CONSTRAINT "countries_iso_alpha2_unique" UNIQUE("iso_alpha2"),
	CONSTRAINT "countries_iso_alpha3_unique" UNIQUE("iso_alpha3"),
	CONSTRAINT "countries_iso_numeric_unique" UNIQUE("iso_numeric"),
	CONSTRAINT "countries_i18n_key_unique" UNIQUE("i18n_key")
);
--> statement-breakpoint
CREATE TABLE "documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"document_type_id" uuid NOT NULL,
	"country_id" uuid NOT NULL,
	"replaced_by_id" uuid,
	"document" varchar(100) NOT NULL,
	"expiration_date" timestamp,
	"status" varchar(50) DEFAULT 'PENDING' NOT NULL,
	"verified_at" timestamp,
	"verified_by_id" uuid,
	"replacement_reason" varchar(255),
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"created_by_id" uuid,
	"created_by_type" varchar(50) DEFAULT 'SYSTEM' NOT NULL,
	"updated_by_id" uuid,
	"updated_by_type" varchar(50) DEFAULT 'SYSTEM' NOT NULL,
	"deleted_by_id" uuid,
	"deleted_by_type" varchar(50) DEFAULT 'SYSTEM',
	CONSTRAINT "unique_document_per_type_country" UNIQUE("document_type_id","document","country_id")
);
--> statement-breakpoint
CREATE TABLE "document_archives" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"document_id" uuid NOT NULL,
	"type" varchar(50) DEFAULT 'OTHER' NOT NULL,
	"status" varchar(50) DEFAULT 'PENDING' NOT NULL,
	"verified_at" timestamp,
	"verified_by_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"created_by_id" uuid,
	"created_by_type" varchar(50) DEFAULT 'SYSTEM' NOT NULL,
	"updated_by_id" uuid,
	"updated_by_type" varchar(50) DEFAULT 'SYSTEM' NOT NULL,
	"deleted_by_id" uuid,
	"deleted_by_type" varchar(50) DEFAULT 'SYSTEM',
	CONSTRAINT "unique_document_archive" UNIQUE("document_id","id")
);
--> statement-breakpoint
CREATE TABLE "document_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"document_id" uuid NOT NULL,
	"event_type" varchar(50) NOT NULL,
	"actor_id" uuid,
	"actor_type" varchar(50) DEFAULT 'USER' NOT NULL,
	"reason" varchar(500),
	"payload" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"created_by_id" uuid,
	"created_by_type" varchar(50) DEFAULT 'SYSTEM' NOT NULL,
	"updated_by_id" uuid,
	"updated_by_type" varchar(50) DEFAULT 'SYSTEM' NOT NULL,
	"deleted_by_id" uuid,
	"deleted_by_type" varchar(50) DEFAULT 'SYSTEM'
);
--> statement-breakpoint
CREATE TABLE "document_types" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"country_id" uuid,
	"code" varchar(255) NOT NULL,
	"i18n_key" varchar(255) NOT NULL,
	"name" varchar(255),
	"is_primary" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"created_by_id" uuid,
	"created_by_type" varchar(50) DEFAULT 'SYSTEM' NOT NULL,
	"updated_by_id" uuid,
	"updated_by_type" varchar(50) DEFAULT 'SYSTEM' NOT NULL,
	"deleted_by_id" uuid,
	"deleted_by_type" varchar(50) DEFAULT 'SYSTEM',
	CONSTRAINT "document_types_i18n_key_unique" UNIQUE("i18n_key")
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"current_tenant_id" uuid,
	"access_token" text NOT NULL,
	"refresh_token_hash" text NOT NULL,
	"refresh_token_expires_at" timestamp NOT NULL,
	"ip_address" varchar(45),
	"user_agent" text,
	"device_info" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "states" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"country_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"abbreviation" varchar(10) NOT NULL,
	"i18n_key" varchar(255),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"created_by_id" uuid,
	"created_by_type" varchar(50) DEFAULT 'SYSTEM',
	"updated_by_id" uuid,
	"updated_by_type" varchar(50) DEFAULT 'SYSTEM',
	"deleted_by_id" uuid,
	"deleted_by_type" varchar(50),
	CONSTRAINT "states_i18n_key_unique" UNIQUE("i18n_key")
);
--> statement-breakpoint
CREATE TABLE "tenant_addresses" (
	"tenant_id" uuid NOT NULL,
	"address_id" uuid NOT NULL,
	"is_main" boolean DEFAULT false NOT NULL,
	"address_type" varchar(50) DEFAULT 'OTHER' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"created_by_id" uuid,
	"created_by_type" varchar(50) DEFAULT 'SYSTEM' NOT NULL,
	"updated_by_id" uuid,
	"updated_by_type" varchar(50) DEFAULT 'SYSTEM' NOT NULL,
	"deleted_by_id" uuid,
	"deleted_by_type" varchar(50) DEFAULT 'SYSTEM',
	CONSTRAINT "tenant_addresses_tenant_id_address_id_pk" PRIMARY KEY("tenant_id","address_id")
);
--> statement-breakpoint
CREATE TABLE "tenant_documents" (
	"tenant_id" uuid NOT NULL,
	"document_id" uuid NOT NULL,
	"is_main" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"created_by_id" uuid,
	"created_by_type" varchar(50) DEFAULT 'SYSTEM' NOT NULL,
	"updated_by_id" uuid,
	"updated_by_type" varchar(50) DEFAULT 'SYSTEM' NOT NULL,
	"deleted_by_id" uuid,
	"deleted_by_type" varchar(50) DEFAULT 'SYSTEM',
	CONSTRAINT "tenant_documents_tenant_id_document_id_pk" PRIMARY KEY("tenant_id","document_id")
);
--> statement-breakpoint
CREATE TABLE "tenants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"created_by_id" uuid,
	"created_by_type" varchar(50) DEFAULT 'SYSTEM' NOT NULL,
	"updated_by_id" uuid,
	"updated_by_type" varchar(50) DEFAULT 'SYSTEM' NOT NULL,
	"deleted_by_id" uuid,
	"deleted_by_type" varchar(50) DEFAULT 'SYSTEM',
	"name" varchar(255) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"type" varchar(20) DEFAULT 'PREFEITURA' NOT NULL,
	"fantasy_name" varchar(255),
	"responsible_name" varchar(255),
	"email" varchar(255) NOT NULL,
	"phone" varchar(20),
	"logo_url" varchar(500),
	"settings" jsonb DEFAULT '{}'::jsonb,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_verified" boolean DEFAULT true NOT NULL,
	CONSTRAINT "tenants_slug_unique" UNIQUE("slug"),
	CONSTRAINT "tenants_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "user_addresses" (
	"user_id" uuid NOT NULL,
	"address_id" uuid NOT NULL,
	"is_main" boolean DEFAULT false NOT NULL,
	"address_type" varchar(50) DEFAULT 'OTHER' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"created_by_id" uuid,
	"created_by_type" varchar(50) DEFAULT 'SYSTEM' NOT NULL,
	"updated_by_id" uuid,
	"updated_by_type" varchar(50) DEFAULT 'SYSTEM' NOT NULL,
	"deleted_by_id" uuid,
	"deleted_by_type" varchar(50) DEFAULT 'SYSTEM',
	CONSTRAINT "user_addresses_user_id_address_id_pk" PRIMARY KEY("user_id","address_id")
);
--> statement-breakpoint
CREATE TABLE "user_documents" (
	"user_id" uuid NOT NULL,
	"document_id" uuid NOT NULL,
	"is_main" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"created_by_id" uuid,
	"created_by_type" varchar(50) DEFAULT 'SYSTEM' NOT NULL,
	"updated_by_id" uuid,
	"updated_by_type" varchar(50) DEFAULT 'SYSTEM' NOT NULL,
	"deleted_by_id" uuid,
	"deleted_by_type" varchar(50) DEFAULT 'SYSTEM',
	CONSTRAINT "user_documents_user_id_document_id_pk" PRIMARY KEY("user_id","document_id")
);
--> statement-breakpoint
CREATE TABLE "user_roles" (
	"user_id" uuid NOT NULL,
	"tenant_id" uuid NOT NULL,
	"role" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_roles_user_id_tenant_id_role_pk" PRIMARY KEY("user_id","tenant_id","role")
);
--> statement-breakpoint
CREATE TABLE "user_participations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"created_by_id" uuid,
	"created_by_type" varchar(50) DEFAULT 'SYSTEM' NOT NULL,
	"updated_by_id" uuid,
	"updated_by_type" varchar(50) DEFAULT 'SYSTEM' NOT NULL,
	"deleted_by_id" uuid,
	"deleted_by_type" varchar(50) DEFAULT 'SYSTEM',
	"user_id" uuid NOT NULL,
	"action_id" uuid NOT NULL,
	"status" varchar(20) DEFAULT 'INTERESTED' NOT NULL,
	"enrolled_at" timestamp DEFAULT now(),
	"check_in_at" timestamp,
	"completed_at" timestamp,
	"points_earned" integer DEFAULT 0,
	"streak_count" integer DEFAULT 0,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "user_badges" (
	"user_id" uuid NOT NULL,
	"badge_id" uuid NOT NULL,
	"earned_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_badges_user_id_badge_id_pk" PRIMARY KEY("user_id","badge_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"created_by_id" uuid,
	"created_by_type" varchar(50) DEFAULT 'SYSTEM' NOT NULL,
	"updated_by_id" uuid,
	"updated_by_type" varchar(50) DEFAULT 'SYSTEM' NOT NULL,
	"deleted_by_id" uuid,
	"deleted_by_type" varchar(50) DEFAULT 'SYSTEM',
	"name" text NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" text NOT NULL,
	"phone" varchar(20),
	"cpf" varchar(14),
	"birth_date" date,
	"gender" varchar(20),
	"avatar_url" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"last_login_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_phone_unique" UNIQUE("phone"),
	CONSTRAINT "users_cpf_unique" UNIQUE("cpf")
);
--> statement-breakpoint
ALTER TABLE "actions" ADD CONSTRAINT "actions_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "action_feedbacks" ADD CONSTRAINT "action_feedbacks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "action_feedbacks" ADD CONSTRAINT "action_feedbacks_action_id_actions_id_fk" FOREIGN KEY ("action_id") REFERENCES "public"."actions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "action_feedbacks" ADD CONSTRAINT "action_feedbacks_participation_id_user_participations_id_fk" FOREIGN KEY ("participation_id") REFERENCES "public"."user_participations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "action_locations" ADD CONSTRAINT "action_locations_action_id_actions_id_fk" FOREIGN KEY ("action_id") REFERENCES "public"."actions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "action_locations" ADD CONSTRAINT "action_locations_address_id_addresses_id_fk" FOREIGN KEY ("address_id") REFERENCES "public"."addresses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_state_id_states_id_fk" FOREIGN KEY ("state_id") REFERENCES "public"."states"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "countries" ADD CONSTRAINT "countries_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "countries" ADD CONSTRAINT "countries_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "countries" ADD CONSTRAINT "countries_deleted_by_id_users_id_fk" FOREIGN KEY ("deleted_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_document_type_id_document_types_id_fk" FOREIGN KEY ("document_type_id") REFERENCES "public"."document_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_replaced_by_id_documents_id_fk" FOREIGN KEY ("replaced_by_id") REFERENCES "public"."documents"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_verified_by_id_users_id_fk" FOREIGN KEY ("verified_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_deleted_by_id_users_id_fk" FOREIGN KEY ("deleted_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_archives" ADD CONSTRAINT "document_archives_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_archives" ADD CONSTRAINT "document_archives_verified_by_id_users_id_fk" FOREIGN KEY ("verified_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_archives" ADD CONSTRAINT "document_archives_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_archives" ADD CONSTRAINT "document_archives_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_archives" ADD CONSTRAINT "document_archives_deleted_by_id_users_id_fk" FOREIGN KEY ("deleted_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_events" ADD CONSTRAINT "document_events_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_events" ADD CONSTRAINT "document_events_actor_id_users_id_fk" FOREIGN KEY ("actor_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_events" ADD CONSTRAINT "document_events_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_events" ADD CONSTRAINT "document_events_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_events" ADD CONSTRAINT "document_events_deleted_by_id_users_id_fk" FOREIGN KEY ("deleted_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_types" ADD CONSTRAINT "document_types_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_types" ADD CONSTRAINT "document_types_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_types" ADD CONSTRAINT "document_types_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_types" ADD CONSTRAINT "document_types_deleted_by_id_users_id_fk" FOREIGN KEY ("deleted_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_current_tenant_id_tenants_id_fk" FOREIGN KEY ("current_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "states" ADD CONSTRAINT "states_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant_addresses" ADD CONSTRAINT "tenant_addresses_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant_addresses" ADD CONSTRAINT "tenant_addresses_address_id_addresses_id_fk" FOREIGN KEY ("address_id") REFERENCES "public"."addresses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant_addresses" ADD CONSTRAINT "tenant_addresses_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant_addresses" ADD CONSTRAINT "tenant_addresses_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant_addresses" ADD CONSTRAINT "tenant_addresses_deleted_by_id_users_id_fk" FOREIGN KEY ("deleted_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant_documents" ADD CONSTRAINT "tenant_documents_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant_documents" ADD CONSTRAINT "tenant_documents_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant_documents" ADD CONSTRAINT "tenant_documents_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant_documents" ADD CONSTRAINT "tenant_documents_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant_documents" ADD CONSTRAINT "tenant_documents_deleted_by_id_users_id_fk" FOREIGN KEY ("deleted_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_addresses" ADD CONSTRAINT "user_addresses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_addresses" ADD CONSTRAINT "user_addresses_address_id_addresses_id_fk" FOREIGN KEY ("address_id") REFERENCES "public"."addresses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_addresses" ADD CONSTRAINT "user_addresses_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_addresses" ADD CONSTRAINT "user_addresses_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_addresses" ADD CONSTRAINT "user_addresses_deleted_by_id_users_id_fk" FOREIGN KEY ("deleted_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_documents" ADD CONSTRAINT "user_documents_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_documents" ADD CONSTRAINT "user_documents_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_documents" ADD CONSTRAINT "user_documents_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_documents" ADD CONSTRAINT "user_documents_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_documents" ADD CONSTRAINT "user_documents_deleted_by_id_users_id_fk" FOREIGN KEY ("deleted_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_participations" ADD CONSTRAINT "user_participations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_participations" ADD CONSTRAINT "user_participations_action_id_actions_id_fk" FOREIGN KEY ("action_id") REFERENCES "public"."actions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_badges" ADD CONSTRAINT "user_badges_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_badges" ADD CONSTRAINT "user_badges_badge_id_badges_id_fk" FOREIGN KEY ("badge_id") REFERENCES "public"."badges"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "idx_user_active" ON "sessions" USING btree ("user_id") WHERE "sessions"."is_active" IS TRUE;--> statement-breakpoint
CREATE UNIQUE INDEX "idx_refresh_hash" ON "sessions" USING btree ("refresh_token_hash");